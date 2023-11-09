public class PoolCue extends Item {
    int length;
    PoolCue(int weight, int length){
        this.weight=weight;
        this.length=length;
    }
    void itemAdded(){
        System.out.println("PoolCue added!");
    }
}
