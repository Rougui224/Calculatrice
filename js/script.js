// On met tout le code dans ce evenement pour s'assurer qu'il ne s'execute avant la fin du chargement de la page


document.addEventListener('DOMContentLoaded',()=>{
    // on recupere les variables utiles
    let bouton = document.querySelectorAll('button')
    let screen = document.querySelector('#screen')
    console.log(bouton)
    // on crée la fonction pour le calcul
    function calculator(nombreA, operator, nombreB){
        // on oublie pas de convertir les nombres 
        nombreA=nombreA*1
        nombreB=nombreB*1
        switch(operator){
            case '+':
                return nombreA+nombreB
                break
            case '-':
                return nombreA-nombreB
                break
            case '*':
                return nombreA*nombreB
                break
            case '/':
                return nombreA/nombreB
                break
            default: Error;
        }
    }

    function calculatoExept(nombreA,operator){
        nombreA=nombreA*1
        switch(operator){
            case'pourcent':
                return nombreA/100
                break
            case 'racine':
                return Math.sqrt(nombreA)
            default: Error;   

        }
    }
    // on crée les variables necessaire
    let firstNumber='', secondNumber='', operator =''
    bouton.forEach(bouton => {
        // on crée la variable value pour choisir dynamiquement les bouton
        let value = bouton.getAttribute('value')


        bouton.addEventListener('click',()=>{
            // on doit programer les boutons C et AC pour arreter tout le temps la calculatrice
            if(value ==='C'){
                firstNumber        =''
                secondNumber       =''
                operator           =''
                screen.textContent ='0'
              
            }else{
              
                // on trouve 1er nombre et deuxieme nombre
                if((value >= '0' && value <= '9')|| value=='.'){
                    // ici on protege d'abord la calculatrice pour ne pas que l'utilisateur entre plusieurs fois la virgule
                    if(value=='.' && (firstNumber.includes('.')|| secondNumber.includes('.'))){
                        return
                    }
                    // ici on dit tant que l'operateur est vide , l'utilisateur entre le premier nombre, sinon l'utilisateur entre le deuxieme nombre
                    else if(operator==''){
                        firstNumber+=value
                        screen.textContent= firstNumber
                        
                    }else{
                        secondNumber+=value
                        screen.textContent= secondNumber
                    }

                    

                }
                //  Trouvons l'opeerateur
                else if(value ==='+'|| value ==='-'||value ==='*'||value ==='/'){
                    // on verifie bien que l'utilisateur a entré les deux nombre pour faire le calcul
                    if(firstNumber!=='' && secondNumber!==''){
                        // ici on met le calcul dans la premier variable pour permettre à l'utilisateur de faire un calcul à l'infini 

                        firstNumber=calculator(firstNumber,operator,secondNumber)
                        screen.textContent=firstNumber
                        secondNumber=''
                    }
                    // ici on definie l'operateur bien après le calcul pour eviter des mauvaise interpretations si jamais l'utilisateur continuait le calcul avec les signes
                    operator=value

                }
                else if(value==='='){
                    if(firstNumber!=='' && secondNumber!==''){
                        // ici on met le calcul dans la premier variable pour permettre à l'utilisateur de faire un calcul à l'infini 

                        firstNumber=calculator(firstNumber,operator,secondNumber)
                        screen.textContent=firstNumber
                        secondNumber=''
                        operator=''
                    }
                   
                }
                // voici le calcul pour le pourcentage
                if(value==='pourcent'){
                    if(firstNumber!==''&& operator===''){
                        firstNumber= calculatoExept(firstNumber,value)
                        screen.textContent=firstNumber
                        
                       
                    }
                    else if( operator!=='' && secondNumber !==""){
                        secondNumber=calculatoExept(secondNumber,value)
                        screen.textContent=secondNumber

                    }
                }
                if(value==='racine'){
                    if(firstNumber!=='' && operator==""){
                        firstNumber=calculatoExept(firstNumber,value)
                        screen.textContent=firstNumber
                    }else if(operator !=='' && secondNumber!==""){
                        secondNumber=calculatoExept(secondNumber,value)
                        screen.textContent=secondNumber
                    }
                }
               
               

               
                console.log('Ceci est le premier nombre'+firstNumber)
                console.log('Ceci est le deuxieme nombre'+secondNumber)
            }
        } )
    })
})









