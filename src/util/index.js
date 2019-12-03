
//美音
export const playUSWord = function(name){
    let audio = new Audio();
    audio.src = `https://dict.youdao.com/dictvoice?audio=${name}&type=2`;
    audio.play();
}

//英音
export const playUKWord = function(name){
    let audio = new Audio();
    audio.src = `https://dict.youdao.com/dictvoice?audio=${name}&type=1`;
    audio.play();
}