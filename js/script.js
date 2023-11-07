// On met tout le code dans ce evenement pour s'assurer qu'il ne s'execute avant la fin du chargement de la page

document.addEventListener('DOMContentLoaded', () => {
    // on recupere les variables nécessaires
    const screen  = document.querySelector('#screen')
    const boutons = document.querySelectorAll('button')

    // on en crée d'autres
    let firsNumber   = ''
    let operator     = ''
    let secondNumber = ''

    // on crée la fonction des operations
    function calculate (nombreA,signe,nombreB){
        // on les convertit en nombres
        nombreA = parseFloat(nombreA)
        nombreB = parseFloat(nombreB)

        // on met un switch pour l'operateur
        switch(signe){
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
            default:
                return "Error";
        }
    }

    // on met les evenements pour detecter le clique de chaque bouton
    boutons.forEach(bouton=>{
        // on ajoute directement les evements pour pouvoir recuperer les valeurs 
        bouton.addEventListener('click', ()=>{
            //  on les stock dans une variable
            let value = bouton.getAttribute('value')
            if(value ==="C"){
                // alors on reinitialise toutes les variables
                firsNumber =''
                operator=''
                secondNumber=''
                screen.textContent='0' 
                console.log(value)
               

            } else {
                        // on recupere les valeur du premier et deuxieme nombre
                if(value >="0" && value <="9"){
                    // ici on dit tant on a pas encore appuyer sur l'operateur alors le premier nombre est celui qu'on a cliqué dessus
                    if(operator===''){
                        firsNumber+=value
                        screen.textContent= firsNumber
                    }else{
                        secondNumber+= value
                        screen.textContent= secondNumber

                    }
                    // on fini de recuperer nos deux nombres

                }
                // on trouve l'operateur
                else if(value==='+' || value==='-' || value==='*' || value==='/' ){
                    operator=value
                    if(firsNumber !=='' && secondNumber !==''){
                        // on stock le calcul dans la premiere variable et on reinitialise les autres, pourque l'utilisateur puisse faire des calcul à l'infini
                        firsNumber=calculate(firsNumber,operator,secondNumber)
                        screen.textContent= firsNumber
                      
                        secondNumber=''
                       
                    }
                   

                
                }else if(value ='='){
                    // on verifie si l'utilisateur a bien entré les deux nombres
                    if(firsNumber !=='' && secondNumber !==''){
                        // on stock le calcul dans la premiere variable et on reinitialise les autres, pourque l'utilisateur puisse faire des calcul à l'infini
                        firsNumber=calculate(firsNumber,operator,secondNumber)
                        screen.textContent= firsNumber
                        operator=''
                        secondNumber=''
                    

                    } 
                
                }
            }

             

        })
    })


})









