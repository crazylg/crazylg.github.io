function mySort(a, b)
{
    if (a.age < b.age){
        return 1;
    }else if (a.age > b.age){
        return -1;
    }

    if (a.age === b.age) {
        if (a.score < b.score) {
            return -1;
        } else if (a.score > b.score) {
            return 1;
        }

        if (a.score === b.score) {
            if (a.name[0] < b.name[0]) {
                return 1;
            } else if (a.name[0] > b.name[0]) {
                return -1;
            }
        }
    }
    return 0;
}