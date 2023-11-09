public class RareItem extends Item {
    int value;
    RareItem(int weight, int value){
        this.weight=weight;
        this.value=value;
    }
    void itemAdded(){
        System.out.println("RareItem added!");
    }
}
