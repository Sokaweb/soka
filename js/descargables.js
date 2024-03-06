var urlPage = window.location.search;
const urlParams = new URLSearchParams(urlPage);
const idParam = urlParams.get('ebook');

console.log(idParam);

fetch('./data/descargables.json')
.then(response => response.json() )
.then(data => {

    const ebook = data.filter(filtra =>{
        return filtra.id == idParam;
    })

    const {id, title, format, description, image, data_form_ML} = ebook[0];

    // const idEbook = id;
    const formatEbook = format;
    const titleEbook = title;
    const descriptionEbook = description;
    const imageEbook = image;
    const data_form_MLEbook = data_form_ML;

    document.getElementById('format').innerHTML = formatEbook;
    document.getElementById('title').innerHTML = titleEbook;
    document.getElementById('description').innerHTML = descriptionEbook;

    const imgEbook = document.createElement('img');
    imgEbook.src = './img/ebook-'+imageEbook 
    imgEbook.classList = 'w-50'
    document.querySelector('.image').appendChild(imgEbook);

    const dataForm = document.createElement('div');
    dataForm.classList ='ml-embedded border bg-white rounded shadow';
    dataForm.setAttribute('data-form', data_form_MLEbook);
    document.querySelector('.dataForm').appendChild(dataForm);


    
});

