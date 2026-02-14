import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { Model } from 'mongoose';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  private client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  constructor(
    @Inject('AUTH_MODEL')
    private authModel: Model<Auth>,
    private jwtService: JwtService,
  ) { }

  async googleLogin(idToken: string) {
    try {
      // 1️⃣ Verify Google token
      const ticket = await this.client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload:any = ticket.getPayload();

      const googleId = payload.sub;
      const email = payload.email;
      const name = payload.name;
      const picture = payload.picture;

      // 2️⃣ Find or create user (pseudo)
      let user = await this.findOrCreateUser({googleId,email,name,picture});

      console.log('User after findOrCreate:', user);

      // 3️⃣ Create App JWT
      const appToken = this.jwtService.sign({
        userId: user.id,
      });

      return {
        token: appToken,
        user,
      };
    } catch (e) {
      throw new UnauthorizedException('Invalid Google token');
    }
  }

  // 🔧 Replace with DB logic
  private async findOrCreateUser(data: any) {
    const user = await this.authModel.findOne({ googleId: data.googleId }).exec();
    if (user) {
      return user;
    }
    else{
      const newUser = new this.authModel({...data, role: 'user'});
      await newUser.save();
      return newUser;
    }
  }

  async updatePhone(phone: string, userId: string) {
    const user = await this.authModel.findOne({ _id: userId }).exec();
    if (user) {
      user.phone = phone;
      const authModel = new this.authModel(user);
      return authModel.updateOne(user);
    }
  }
}
