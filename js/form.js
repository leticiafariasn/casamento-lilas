const button = document.getElementById ('submit');

const addLoading = () =>{
    button.innerHTML = '<img src="./images/spinner.svg" class = "loading">';
}

const removeoading = () =>{
    button.innerHTML = 'Confirmar Presença';
}



const handleSubmit = (event) =>{

    event.preventDefault();
    addLoading();

    const nome = document.querySelector('input[name=nome').value;
    const email = document.querySelector('input[name=email').value;
    const telefone = document.querySelector('input[name=telefone').value;
    const acompanhantes = document.querySelector('select[name=acompanhantes').value;
    const mensagem = document.querySelector('textarea[name=mensagem').value;


    fetch('https://api.sheetmonkey.io/form/ri6NRsJ9mYsHBm1YZvXR5y',{
        
        method:'post',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
        },
        body: JSON.stringify({ nome, email, telefone,acompanhantes,mensagem}),
    }).then(() => removeoading()); 
}

document.querySelector('form').addEventListener('submit',handleSubmit);