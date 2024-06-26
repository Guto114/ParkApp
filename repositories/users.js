const fs = require('fs');
const crypto = require('crypto');

class UsersRepository {
    constructor(filename){
        if (!filename){
            throw new Error('Criando um novo repositorio precisa de um nome');
        }
        
        this.filename = filename;
        try {
        fs.accessSync(this.filename);
        } catch (err){
            fs.writeFileSync(this.filename, '[]');
        }
    }
    async getAll(){
        return JSON.parse(
            await fs.promises.readFile(this.filename,{
                encoding: 'utf-8'
            })
        );
        
    }
    async create(attrs){
        attrs.id = this.randomId();
        attrs.bla = Math.floor(Math.random()*10);
        const records = await this.getAll();
        records.push(attrs);

        await this.writeAll(records);
    }

    async writeAll(records){
        await fs.promises.writeFile(
            this.filename,
            JSON.stringify(records, null,2)
        );

    }

    randomId(){
       return crypto.randomBytes(4).toString('hex');
    }

    async getOne(id){
        const records = await this.getAll();
        return records.find(record => record.id === id);
    }

    async delete(id){
        const records = await this.getAll();
        const filteredRecords = records.filter(record => record.id !== id);
        await this.writeAll(filteredRecords);
    }
}

const test = async () =>{
    const repo = new UsersRepository('usuarios.json');

    await repo.delete('9fac54fb');

   
};
test();