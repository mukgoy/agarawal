export function auditPlugin(schema: any) {

    schema.pre('findOneAndUpdate', async function () {
        this._oldDoc = await this.model.findOne(this.getQuery());
    });

    schema.post('findOneAndUpdate', async function (doc) {
        if (!doc) return;
        const AuditModel = this.model.db.model('audit');
        await AuditModel.create({
            collection: this.model.collection.name,
            documentId: doc._id,
            action: 'update',
            oldValue: this._oldDoc,
            newValue: doc
        });
    });

    schema.post('save', async function (doc) {
        const AuditModel = doc.constructor.db.model('audit');
        await AuditModel.create({
            collection: doc.constructor.collection.name,
            documentId: doc._id,
            action: 'create',
            newValue: doc
        });
    });

    schema.post('findOneAndDelete', async function (doc) {
        if (!doc) return;
        const AuditModel = this.model.db.model('audit');
        await AuditModel.create({
            collection: this.model.collection.name,
            documentId: doc._id,
            action: 'delete',
            oldValue: doc
        });
    });
}