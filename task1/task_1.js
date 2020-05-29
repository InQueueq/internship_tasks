const fs = require("fs");

function taskv1(st) {
    result = [];
    n_variables = st.length -1;
    for(i =0;i < Math.pow(2,n_variables);i++) {
        pad_list = st.split('');
        dots_to_insert = [];
        for(j=0; j < n_variables; j++) {
            if (((i>>j)&1) === 1) {
                dots_to_insert.push('.');
            }
            else {
                dots_to_insert.push('');
            }
        }
        for(k =0;k<dots_to_insert.length;k++){
            pad_list[k] = pad_list[k]+dots_to_insert[k];
        }
        result.push(pad_list.join(''));
    }
    return result;
}

function taskv2(st,res,offset,string_builder=""){
    if(offset >= st.length-1){
        res.push(string_builder+st[st.length-1]);
        return res;
    }
    if(offset < st.length){
        string_builder += st[offset];
        taskv2(st,res,offset+1,string_builder);
        string_builder += '.';
        taskv2(st,res,offset+1,string_builder);
    }
    return res;
}

st = "abcdeabcdeabcdeac"

res = []


//memory1 =0;
//memory2 =0;

//for(f = 0;f < 100; f++){
    //mem1 = process.memoryUsage().heapUsed;
    //taskv1(st);
    //memory1 += ((process.memoryUsage().heapUsed - mem1) / 1024 / 1024);
    //fs.appendFileSync("memoryImper.txt", memory1.toString().replace('.',',') + '\n');
//}

// for(p = 0;p < 100; p++){
//     mem2 = process.memoryUsage().heapUsed;
//     taskv2(st,res,0);
//     memory2 += ((process.memoryUsage().heapUsed - mem2) / 1024 / 1024);
//     fs.appendFileSync("memoryRecurs.txt", memory2.toString().replace('.',',') + '\n');
// }


// fs.readFile('toParse.txt', 'utf8', function(err, contents) {
//     contents = contents.split('\r\n');
//     for(i =0;i<contents.length;i++){
//         contents[i] = contents[i].split(' ')[1];
//     }
//     fs.appendFileSync("parsedText.txt",contents.join('\n'));
// });



