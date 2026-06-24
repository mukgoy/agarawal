// config.service.ts
import { APP_INITIALIZER, Injectable } from '@angular/core';
import { firstValueFrom, retry, timer } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class ConfigService {
    private config: any;

    constructor(private http: HttpService) { }

    loadConfig(): Promise<void> {
        return firstValueFrom(
            this.http.get('v1/health-check').pipe(
                retry({
                    count: 5,
                    delay: (_, retryCount) => timer(retryCount * 1000)
                })
            )
        ).then(config => {
            this.config = config;
        });
    }
}

export function initializeApp(configService: ConfigService) {
    return () => configService.loadConfig();
}

export const appInitializer = {
    provide: APP_INITIALIZER,
    useFactory: initializeApp,
    deps: [ConfigService],
    multi: true
}