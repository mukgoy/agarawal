import {AuditModel} from './audit.schema';
export function auditPlugin(schema: any) {

    schema.pre('findOneAndUpdate', async function () {
        this.setOptions({
            new: true,
            runValidators: true
        });
        this._oldDoc = await this.model.findOne(this.getQuery());
    });

    schema.post('findOneAndUpdate', async function (doc) {
        if (!doc) return;
        await AuditModel.create({
            collection: this.model.collection.name,
            documentId: doc._id,
            action: 'update',
            oldValue: this._oldDoc,
            newValue: doc
        });
    });

    schema.post('save', async function (doc) {
        await AuditModel.create({
            collection: doc.constructor.collection.name,
            documentId: doc._id,
            action: 'create',
            newValue: doc
        });
    });

    schema.post('findOneAndDelete', async function (doc) {
        if (!doc) return;
        await AuditModel.create({
            collection: this.model.collection.name,
            documentId: doc._id,
            action: 'delete',
            oldValue: doc
        });
    });
}