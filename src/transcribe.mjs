// // import {
// //   TranscribeStreamingClient,
// //   StartStreamTranscriptionCommand
// // } from "@aws-sdk/client-transcribe-streaming";
// // import { createReadStream } from "fs";
// // import { dirname, resolve, join } from "path";
// // // const {
// // //   TranscribeStreamingClient,
// // //   StartStreamTranscriptionCommand,
// // // } = require("@aws-sdk/client-transcribe-streaming");
// // // const { createReadStream } = require("fs");
// // // const { join } = require("path");
// // const __dirname = resolve(dirname(''));
// //
// // const audio = createReadStream(join(__dirname, "my-media-file.flac"), { highWaterMark: 1024 * 16});
// //
// // const LanguageCode = "en-US";
// // const MediaEncoding = "pcm";
// // const MediaSampleRateHertz = "16000";
// // const credentials = {
// //   "accessKeyId": "AKIA3W5A644DDE6EIS7S",
// //   "secretAccessKey": "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",
// // };
// //
// // export async function startRequest() {
// //   const client = new TranscribeStreamingClient({
// //     region: "us-east-1",
// //     credentials
// //   });
// //
// //   const params = {
// //     LanguageCode,
// //     MediaEncoding,
// //     MediaSampleRateHertz,
// //     AudioStream: (async function* () {
// //       for await (const chunk of audio) {
// //         yield {AudioEvent: {AudioChunk: chunk}};
// //       }
// //     })(),
// //   };
// //   const command = new StartStreamTranscriptionCommand(params);
// //   // Send transcription request
// //   const response = await client.send(command);
// //   // Start to print response
// //   try {
// //     for await (const event of response.TranscriptResultStream) {
// //       console.log(JSON.stringify(event));
// //     }
// //   } catch(err) {
// //     console.log("error")
// //     console.log(err)
// //   }
// // }
// //
// // // module.exports.transcribe = startRequest
// // new speech recognition object
// var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
// var recognition = new SpeechRecognition();
//
// // This runs when the speech recognition service starts
// recognition.onstart = function() {
//   console.log("We are listening. Try speaking into the microphone.");
// };
//
// recognition.onspeechend = function() {
//   // when user is done speaking
//   recognition.stop();
// }
//
// // This runs when the speech recognition service returns result
// recognition.onresult = function(event) {
//   var transcript = event.results[0][0].transcript;
//   var confidence = event.results[0][0].confidence;
// };
//
