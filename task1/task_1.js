const fs = require("fs");

// Task with reduce implementation
function taskv0(st) {
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
        result.push(pad_list.reduce((accum, curr)=>accum+curr));
    }
    return result;
}

// Task with join implementation
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
// Recursive implementation
function taskv2(st,res=[],offset=0,string_builder=""){
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

st = "abcdeabcdeabcdeabcde";

// Measure memory consumption
const memory_measure = function(task_func, num_of_iterations,param,memory=0,output_filename){
    for(f = 0;f < num_of_iterations; f++){
        mem = process.memoryUsage().heapUsed;
        task_func(param)
        memory += ((process.memoryUsage().heapUsed - mem) / 1024 / 1024);
        fs.appendFileSync(output_filename, memory.toString().replace('.',',') + '\n');
    }
}

// Measure runtime
const time_measure = function (task_func,num_of_iterations,param) {
    for(q = 0;q<num_of_iterations;q++){
        console.time();
        task_func(param);
        console.timeEnd();
    }
}
// Parse text from console->yourFile
const parse = function (filename) {
    fs.readFile(filename, 'utf8', function(err, contents) {
        contents = contents.split('\n').map(content => content.split(' '));
        for(i = 0;i<contents.length-1;i++){
            fs.appendFileSync("parsedText.txt",contents[i][1].split('.')[0].toString()+'\n');
        }
    });

}
//parse("timinglog.txt");
//time_measure(taskv2,100,st);
//memory_measure(taskv1,100,st,0,"memoryImper.txt")
