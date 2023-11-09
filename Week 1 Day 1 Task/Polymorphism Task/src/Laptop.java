public class Laptop extends Item {
    String model;
    int storage;
    Laptop(int weight, String model, int storage){
        this.weight=weight;
        this.model=model;
        this.storage=storage;
    }
    void itemAdded(){
        System.out.println("Laptop added!");
    }
}
