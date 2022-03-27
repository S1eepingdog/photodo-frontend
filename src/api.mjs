let apigClient = apigClientFactory.newClient();

function search(keyword, callback) {
    var params = {
        q: keyword
    };

    var body = {

    };

    var additionalParams = {

    };

    apigClient.searchGet(params, body, additionalParams).then(function (result) {
        console.log(result.data)
        callback(result.data);
    }).catch( function(result){
        // console.log(result.data);
    });
    return null;
}

var bucketRegion = "us-east-1"
var IdentityPoolId = "us-east-1:c379ade2-17ce-47f9-8aa0-ad342c758a37"

AWS.config.update({
    region: bucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId
    })
});

function uploadPhoto(file, labels) {
    var fileName = file.name;

    // Use S3 ManagedUpload class as it supports multipart uploads
    var upload = new AWS.S3.ManagedUpload({
        params: {
            Bucket: "hw2-b2-photo-storage",
            Key: fileName,
            Body: file,
            Metadata: {
                "customLabels": labels
            }
        }
    });

    var promise = upload.promise();

    promise.then(
        function(data) {
            alert("Successfully uploaded photo.");
        },
        function(err) {
            console.log(err)
            return alert("There was an error uploading your photo: ", err.message);
        }
    );
}