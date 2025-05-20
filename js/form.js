const button = document.getElementById ('submit');

const addLoading = () =>{
    button.innerHTML = '<img src="./images/loading.webp" class = "loading">';
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
    const messagem = document.querySelector('textarea[name=messagem').value;


    fetch('https://api.sheetmonkey.io/form/6X4bfe7zFzeaAe6SXLX3rJ',{
        
        method:'post',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
        },
        body: JSON.stringify({ nome, email, telefone,acompanhantes,messagem}),
    }).then(() => removeoading()); 
}

document.querySelector('form').addEventListener('submit',handleSubmit);