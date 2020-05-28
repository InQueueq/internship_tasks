import time
def variant1(st):
    res = []
    template_str = '{}'.join(list(st))
    n_variables = len(st) - 1
    for counter in range(2 ** n_variables):
        binary_str = str(bin(counter)).split('b')[1]
        binary_str = "0" * (n_variables - len(binary_str)) + binary_str
        dots_to_insert = ['.' if char == '1' else '' for char in binary_str]
        res.append(template_str.format(*dots_to_insert))

    return res

#Pobitovo umnozhit
def variant2(st):
    template_str = '{}'.join(list(st))
    res = []
    n_variables = len(st)-1
    for counter in range(2**n_variables):
        binary = counter
        dots_to_insert = []
        for i in range(n_variables):
            if binary & 1 == 1:
                dots_to_insert.append('.')
            else:
                dots_to_insert.append('')
            binary = binary>>1
        res.append(template_str.format(*dots_to_insert))

    return res


#Binary tree
def variant3(st,res,depth):

    if depth <= 0:
        return res
    if depth > 0:

        res_st = st[:depth] + '' + st[depth:]
        st = res_st
        res.append(res_st)
        variant3(st, res, depth - 1)

        res_st = st[:depth] + '.' + st[depth:]
        st = res_st
        res.append(res_st)
        variant3(st, res, depth - 1)
    return set(res)


st = 'abcdefghj'
res = []
start_time = time.time()
print(variant1(st))
end_time = time.time()
c = start_time-end_time
print(c)
start_time = time.time()
print(variant2(st))
end_time = time.time()
c = start_time-end_time
print(c)
start_time = time.time()
print(variant3(st, res,len(st)-1))
end_time = time.time()
c = start_time-end_time
print(c)
