f1 = open('words2.txt', 'r')
f2 = open('writing2.txt', 'w')


i=1
while(i):
    line = f1.readline().rstrip()
    if line=="":
        i=0
    else:
        if len(line) == 5 and line.isalpha():
            f2.write("\""+line+"\", ")


f1.close()
f2.close()
