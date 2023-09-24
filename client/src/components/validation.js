export default function validation(inputs){

      let errors= {};

      //Se chequea que existan los inputs
      (!inputs.name) ? errors.name = 'Name is required' : errors.name = '';
      (!inputs.weightMin) ? errors.weightMin = 'Minimum weight is required' : errors.weightMin = '';
      (!inputs.weightMax) ? errors.weightMax = 'Maximum weight is required' : errors.weightMax = '';
      (!inputs.heightMin) ? errors.heightMin = 'Minimum height is required' : errors.heightMin = '';
      (!inputs.heightMax) ? errors.heightMax = 'Maximum height is required' : errors.heightMax = '';
      (!inputs.life_span) ? errors.life_span = 'Lifespan is required' : errors.life_span = '';
      (!inputs.temperament) ? errors.temperament = 'Temperaments are required' : errors.temperament = '';



      console.log(inputs);
      console.log('------------------------------------------')
      console.log(inputs.temperament);



      const isWord = (word) => {
        let isWord = true;
        word.forEach((letter) => {
          if (!(letter.charCodeAt() === 32 || (letter.charCodeAt()>=65 && letter.charCodeAt()<=90) || (letter.charCodeAt()>=97 && letter.charCodeAt()<=122) || (letter.charCodeAt()>=128 && letter.charCodeAt()<=165))){
            isWord = false;
          }
        })
        return isWord
      }

      //Validaciones del nombre
      if (inputs.name) {
        if (!isWord(inputs.name.split(''))){
          errors.name='Name must be written in upper and lower case letters only. Name is not valid'
        } else {
          errors.name += '';
        }
        
      }


      //Validaciones del peso minimo
      if (inputs.weightMin) {
        if (!(Number(inputs.weightMin))){
          errors.weightMin='Minimun weight must be a number';
        }
        else if (inputs.weightMin <= 0 || inputs.weightMin >= inputs.weightMax){
          errors.weightMin='Minimun weight must be positive, and the maximum must be greater than the minimum'
        }
      }

      //Validaciones del peso maximo
      if (inputs.weightMax) {
        if (!(Number(inputs.weightMax))){
          errors.weightMax='Maximum weight must be a number';
        }
        else if (inputs.weightMax<=0 || inputs.weightMin >= inputs.weightMax){
          errors.weightMax='Maximum weight must be positive, and the maximum must be greater than the minimum'
        }
      }


      //Validaciones de la altura minima
      if (inputs.heightMin){
        if (!(Number(inputs.heightMin))){
          errors.heightMin='Minimun height must be a number';
        }
        else if (inputs.heightMin <= 0 || inputs.heightMin >= inputs.heightMax){
          errors.heightMin='Minimun height must be positive, and the maximum must be greater than the minimum'
        }
      }


      //Validaciones de la altura maxima
      if (inputs.heightMax){
        if (!(Number(inputs.heightMax))){
          errors.heightMax='Maximum height must be a number';
        }
        else if (inputs.heightMax<=0 || inputs.heightMin >= inputs.heightMax){
          errors.heightMax='Maximum height must be positive, and the maximum must be greater than the minimum'
        }
      }

      //Validaciones de la esperanza de vida
      if (inputs.life_span){
        if (!(Number(inputs.life_span))){
          errors.life_span='Lifespan must be a number';
        }
        else if (inputs.life_span <= 0){
          errors.life_span='Lifespan must be positive';
        }
      }


      //Validaciones de el/los temperamento/s
      if (inputs.temperament && typeof inputs.temperament === "string"){
        if (!isWord(inputs.temperament[0].split(''))){
          errors.temperament='All temperaments must be written in upper and lower case letters only. Temperament is not valid';
          }
          else {
            errors.temperament = '';
          }
      } else if (inputs.temperament && typeof inputs.temperament === "object"){
        errors.temperament = '';
        inputs.temperament.forEach(temperament => {
          if (!isWord(temperament.split(''))){
            errors.temperament='All temperaments must be written in upper and lower case letters only. Temperament is not valid';
          }
        })
      }
  
      return errors;
  
  }