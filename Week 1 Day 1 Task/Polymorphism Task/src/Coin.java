public class Coin extends Item {
    int amount;
    Coin(int weight, int amount){
        this.weight=weight;
        this.amount=amount;
    }
    void itemAdded(){
        System.out.println("Coin added!");
    }
}
