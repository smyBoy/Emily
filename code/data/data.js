/**
 * Created by smy on 2018/2/12.
 */


var demo1Creator = new SeqCreator().add(
    [
        new ObjectCreator({
            "id": "collect",
            "status": "yellow",
            "CPU": new RandomCreator().add(range(50, 70)),
            "Memory": new RandomCreator().add(range(10, 30)),
        }), new ObjectCreator({
        "id": "collect-db",
        "status": "green",
        "CPU": new RandomCreator().add(range(20, 30)),
        "Memory": new RandomCreator().add(range(10, 30)),
    }), new ObjectCreator({
        "id": "arrange",
        "status": "green",
        "CPU": new RandomCreator().add(range(20, 30)),
        "Memory": new RandomCreator().add(range(10, 30)),
    }), new ObjectCreator({
        "id": "fill",
        "status": "green",
        "CPU": new RandomCreator().add(range(20, 30)),
        "Memory": new RandomCreator().add(range(10, 30)),
    }), new ObjectCreator({
        "id": "file-db",
        "status": "green",
        "CPU": new RandomCreator().add(range(20, 30)),
        "Memory": new RandomCreator().add(range(10, 30)),
    }), new ObjectCreator({
        "id": "search",
        "status": "green",
        "CPU": new RandomCreator().add(range(20, 30)),
        "Memory": new RandomCreator().add(range(10, 30)),
    }),
        new ObjectCreator({
            "id": "search-db",
            "status": "green",
            "CPU": new RandomCreator().add(range(50, 70)),
            "Memory": new RandomCreator().add(range(30, 40)),
        }),
    ]
)
function demo1() {
    return demo1Creator.createArray(demo1Creator.array.length)
}
