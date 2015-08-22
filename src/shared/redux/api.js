var  sa =  require ('superagent');

export function getData(index){

    return new Promise(function(resolve,reject){
        console.log('calling promisse with index' + index);
        sa.post('/api/data').send({index:1}).end(function(err,res){
            if (err)
                reject (err);
            else
                resolve(res.body);
        })
    });

}