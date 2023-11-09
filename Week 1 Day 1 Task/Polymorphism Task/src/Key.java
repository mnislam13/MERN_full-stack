public class Key extends Item {
    int code;
    Key(int weight, int code){
        this.weight=weight;
        this.code=code;
    }
    void itemAdded(){
        System.out.println("Key added!");
    }
}
