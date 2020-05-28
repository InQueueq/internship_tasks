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

function taskv2(st,res,offset,string_builder){
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

builder = "";
st = "abcde"
res = []
console.log(taskv1(st));
console.log(taskv2(st,res,0,builder));

