public class Crossbow  extends Item {
    int power;
    Crossbow(int weight, int power){
        this.weight=weight;
        this.power=power;
    }
    void itemAdded(){
        System.out.println("Crossbow added!");
    }
}
