$(function () {
    let searchForm = $('#search-form');
    let searchKeyword = $('#search-keyword');
    let imgContainer = $('#img-container');
    let upload = $('.upload');
    let voice = $('.voice');

    let keyWord = ''; // 用户输入的关键字(默认)
    let page = 1; // 页码标识符

    let modal = document.getElementById('myModal');
    let span = $('.close');
    let preview = document.getElementById("preview");
    let customLabel = $('#custom-label')
    let uploadFile = $('.uploadFile')
    let submitBtn = $('.submitFile')
    let submitFile = null

    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    // This runs when the speech recognition service starts
    recognition.onstart = function() {
        console.log("We are listening. Try speaking into the microphone.");
    };

    recognition.onspeechend = function() {
        // when user is done speaking
        console.log('Speech has stopped being detected');
        recognition.stop();
    }

    // This runs when the speech recognition service returns result
    recognition.onresult = function(event) {
        let transcript = event.results[0][0].transcript;
        let confidence = event.results[0][0].confidence;
        searchKeyword.val(transcript)
    };

    voice.on('click', function (){
        recognition.start();
    })

    upload.on('click', function (){
        modal.style.display = 'block';
    })

    uploadFile.on("change", function (e){
        let file = e.target.files[0];
        if (file.length < 1) return;
        submitFile = file;
        previewFile(file);
    })

    span.on('click', function() {
        modal.style.display = "none";
        preview.src = './imgs/white.png';
        // preview.removeAttribute("src")
        customLabel.value = ""
        uploadFile.val("");
    })

    submitBtn.on('click', function () {
        let label;
        if (submitFile != null) {
            let labels = $("#custom-label");
            if (labels != null) {
                label = labels.val().split(",");
            }
            console.log(label.join(','));
            uploadPhoto(submitFile, label.join(','));
            preview.src = './imgs/white.png';
            // preview.removeAttribute("src")
            uploadFile.val("");
            customLabel.value = ""
            modal.style.display = "none";
        }
    })

    /**
     * previewFile
     * @param file
     */
    function previewFile(file) {
        let reader;
        if (file) {
            reader = new FileReader();
            reader.readAsDataURL(file);
        }
        reader.onload = function(e) {
            preview.src = e.target.result;
        }
    }

    searchForm.on('keydown', function (e) {
        if (e.keyCode === 13) {
            keyWord = searchKeyword.val().trim().toLowerCase();
            imgContainer.html('');
            page = 1;
            search(keyWord, insertHtml);
            var options = {resize: true, minMargin: 20, maxMargin: 40, itemSelector: ".image-wrapper"};
            imgContainer.rowGrid(options);
        }
    });

    /**
     * fill data
     * @param data json data
     */
    function insertHtml(data) {
        if (data) {
            let content = '';
            $(data).each(function (index, item) {
                let img = new Image();
                img.src = item;
                let radio = 320 / img.height;
                let w = img.width * radio;
                content += `
                     <div class="image-wrapper">
                        <img src="${item}" width="${w}" height="320" alt="${keyWord}">
                    </div>  				     
                `;
            });
            imgContainer.append(content);
            imgContainer.rowGrid("appended");
        } else {
            content = '<div class="error-no-image">No images available!</div>';
        }
    }

});