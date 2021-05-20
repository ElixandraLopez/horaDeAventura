
//AGREGAR CORREO INSTITUCIONAL

const fs = require('fs');
const urlsafeBase64 = require('urlsafe-base64');
const vapid = require('./vapid.json');

//const suscripciones = require('/subs-db.json');

const webpush = require('web-push');

webpush.setVapidDetails(

    'mailto:av391370@uaeh.edu.mx',

    vapid.publicKey,

    vapid.privateKey
     
)

let suscripciones=[]; 




module.exports.getKey = ()=>{



    return urlsafeBase64.decode(vapid.publicKey);
    
};


module.exports.addSubscription = (suscripcion) =>{



    suscripciones.push(suscripcion);


    fs.writeFileSync(`${ __dirname}/subs-db.json`,JSON.stringify(suscripciones));


    //console.log(suscripciones);
};

module.exports.sendPush=(post)=>{



    suscripciones.forEach((suscripcion,i)=>{



        webpush.sendNotification(suscripcion,JSON.stringify(post));

    });


}
