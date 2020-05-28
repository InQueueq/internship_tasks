function taskv1(st) {
    res = [];
    pad_list = st.split('');
    n_variables = st.length -1;
    for(i =0;i < Math.pow(n_variables,2);i++) {
        binary = i;
        dots_to_insert = [];

        for(j=0; j < n_variables; j++) {
            if ((binary & 1) === 1) {
                dots_to_insert.push('.');
            }
            else {
                    dots_to_insert.push('');
            }
            binary = binary>>1;
        }
        // Kak zamenit???
        for(k =0;k<dots_to_insert.length;k++){
            pad_list[k] = pad_list[k]+dots_to_insert[k];
        }
        res.push(pad_list.join(''));
        pad_list = st.split('')
    }
    return res;
}



function taskv2(st,res,depth){

    if(depth <= 0){
        return res;
    }
    if(depth > 0){
        res_st = st.slice(0,depth) + '' + st.slice(depth,);
        st = res_st;
        res.push(res_st);
        taskv2(st,res,depth-1);
        res_st = st.slice(0,depth) + '.' + st.slice(depth,);
        st = res_st;
        res.push(res_st);
        taskv2(st,res,depth-1);
    }
    return new Set(res);
}
st = "abc"
depth = st.length-1
res = []
console.log(taskv1(st));
console.log(taskv2(st,res,depth));
