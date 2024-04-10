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
    async update (id, attrs){
        const records = await this.getAll();
        const record = records.find(record => record.id === id);
        
        if (!record){
            throw new Error(`Nao encontramos dados com o id ${id}`);
        }
        Object.assign(record,attrs);
        await this.writeAll(records);
    }
}

const test = async () =>{
    const repo = new UsersRepository('usuarios.json');

    await repo.update('d25d9966',{password:'funciona sim', tretuuopa: 'treino'});

   
};
test();