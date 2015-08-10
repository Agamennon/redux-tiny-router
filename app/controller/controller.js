import Controller from 'cerebral-react-immutable-store';
import request from 'superagent';


const ListMapping = function (){
   return {
       value:[],
       deps:{notes: ['notes']},
       get (value, deps){
           return value.map(function(ref){
              return deps.items[ref]
           });

       }
   }
};


const state = {
    notes: {
       '1':{
           notebook:'',
           tags:['first'],
           title:'The first note',
           text:'This is the FIRST note i have, its too cool so i will write it some more to see it working!'
       },
        '2':{
            notebook:'',
            tags:['second'],
            title:'The second note',
            text:'This is a SECOND note and i love it now i need to make sure this program works as advertised'
        }
    },
    test:'haha',
    list:ListMapping,
    inputValue:'',
    nextRef:0,
    router: {

    }
};

const defaultArgs  = {
  utils: {
      request:request
  }
};

export default Controller(state,defaultArgs);
