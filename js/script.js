// on met tout le code dans un evenement pour s'assurer qu'il ne s'execute qu'à la fin du chargement de la page
document.addEventListener('DOMContentLoaded',()=>{
    // on recupere toutes les variable necessaire
    let screen      = document.querySelector('#screen')
    let button      = document.querySelectorAll('button')

    // on definie les variables necessaires
    let firstNumber="",secondNumber="",operator=""

    // on definie la fontion qui fera le calcul
    function calculator(numberA,operator,numberB){
        // on oublie pas de les convertir en number
        numberA=numberA*1
        numberB=numberB*1

        switch(operator){
            case '+':
                return numberA+numberB
                break
            case '-':
                return numberA-numberB
                break
            case '*':
                return numberA*numberB
                break
            case '/':
                return numberA/numberB
                break
            default: Error
        }
    }
    // Ajoutons un evenement sur tous les boutons
    button.forEach(element =>{
        // Recuperons l'attribut de chaque bouton pour que nous puissions reperer les valeurs
        let value = element.getAttribute('value')

        element.addEventListener('click',()=>{
            // Essayons d'initialiser la calculatrice
            if(value==="C"){
                firstNumber  = ''
                secondNumber = ''
                operator     = ''
                screen.textContent = 0

            }else{
                // Trouvos le premier et deuxieme nombre
                if(value >='0' && value <='9' || value=='.'){
                    if(value=='.' &&(firstNumber.includes(".")||secondNumber.includes('.'))){
                        return
                    } 
                    if(operator==""){
                        firstNumber +=value
                        screen.textContent =firstNumber
                    }else{
                        secondNumber +=value
                        screen.textContent =secondNumber

                    }
                }
                //Trouvons l'operateur
                else if(value=='+' || value=='-' || value=='*' || value=='/'){
                    // On doit abolument verifier que l'utilisateur a fini d'entrée les deux nombre avant de faire le calcul
                    if(firstNumber!='' && secondNumber!=''){
                            // ici on stock le calcul dans la premiere variable pour que l'utilisateur puisse faire des calculs à l'infini
                        firstNumber = calculator(firstNumber,operator,secondNumber)
                        screen.textContent =firstNumber

                        // on reinitialise la seconde variable
                        secondNumber=''
                        
                    }
                    // on definie l'operateir a la fin pour que le navigateur lise les autres instructions en premier, cela evite que les operateurs s'ecrasent quand on fait un calcul à l'infini
                        operator=value
                }
                else if(value=='='){
                    if(firstNumber!='' && secondNumber!=''){

                        firstNumber = calculator(firstNumber,operator,secondNumber)
                        screen.textContent =firstNumber
                        secondNumber=''
                        operator=""
                    }
                    

                }
                else if(value=='racine'){
                    if(firstNumber !="" && secondNumber ==""){
                        firstNumber=Math.sqrt(firstNumber)
                        screen.textContent =firstNumber
                    }else if(secondNumber!=''){
                        secondNumber=Math.sqrt(secondNumber)
                        screen.textContent = secondNumber


                    }
                }
                else if(value=='pourcent'){
                    if(firstNumber !="" && secondNumber ==""){

                        firstNumber=Math.floor(firstNumber)/100
                        screen.textContent =firstNumber
                    }else if(secondNumber!=''){
                        secondNumber=Math.floor(secondNumber)/100
                        screen.textContent = secondNumber


                    }
                }

            }
        })

    })
})