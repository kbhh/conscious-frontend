import MathType from '@wiris/mathtype-ckeditor5';

export default ClassicEditor
    .create(document.querySelector('#editor'), {
        plugins: [MathType],
        toolbar: ['MathType', 'ChemType']
    });