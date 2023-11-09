public class CommonItem extends Item {
    int value;
    CommonItem(int weight, int value){
        this.weight=weight;
        this.value=value;
    }
    void itemAdded(){
        System.out.println("CommonItem added!");
    }

}
