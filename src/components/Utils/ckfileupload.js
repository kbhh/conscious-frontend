import Api from '../../services/Api'


class MyUploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }
    upload() {
        return this.loader.file.then(
            res => {
                let url;
                console.log(res);

                let fun = async function () {
                    let result = await Api().get('/api/reb/curriculum/showCourses').then(r => r.data.record)
                    console.log('data' + JSON.stringify(result));
                    url = result
                    console.log('url' + url);
                }

                fun()

                return {
                    default: url
                }
            }
        )

        // let createitem =  await Api().put(/api/reb/officials/profileimage, { ...this.loader.file})


    }

    // Aborts the upload process.
    abort() {
        console.log("Abort upload");
    }
}

export default function UploadAdapter(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        // Configure the URL to the upload script in your back-end here!
        return new MyUploadAdapter(loader);
    };
}

///
// editorConfig: {
//     extraPlugins: [MyCustomUploadAdapterPlugin],
// },