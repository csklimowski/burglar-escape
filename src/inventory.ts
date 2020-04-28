import { items, ItemDefinition } from './items';
import { MainScene } from './main';

export class InventoryItem extends Phaser.GameObjects.Container {

    inspectButton: Phaser.GameObjects.Image;
    image: Phaser.GameObjects.Image;
    item: ItemDefinition;

    constructor(scene: Phaser.Scene, x: number, y: number,
            item: ItemDefinition) {
        super(scene, x, y);
        scene.add.existing(this);

        this.item = item;
        this.image = scene.add.image(0, 0, item.small);
        
        this.add(this.image);
        
        this.image.setInteractive();
        this.image.on(Phaser.Input.Events.POINTER_DOWN, (p, x, y, event) => {
            event.stopPropagation();
            // @ts-ignore
            this.parentContainer.clickItem(this);
        });
    }
}


export class Inventory extends Phaser.GameObjects.Container {

    area: Phaser.GameObjects.Image;
    bg: Phaser.GameObjects.Image;
    inspectArea: Phaser.GameObjects.Image;
    putAwayArea: Phaser.GameObjects.Image;
    scene: MainScene;

    inspecting: ItemDefinition;

    constructor(scene: Phaser.Scene) {
        super(scene);
        this.area = scene.add.image(640, 670, 'inv-bar');
        
        this.bg = scene.add.image(640, 360, 'inv-bg');
        this.scene.invBg.add(this.bg);
        this.bg.setVisible(false);
        


        this.inspectArea = scene.add.image(640, 550, 'inv-inspect');
        this.inspectArea.setInteractive();
        this.inspectArea.on(Phaser.Input.Events.POINTER_OVER, () => {
            this.inspectArea.setFrame(1);
        }, this);
        this.inspectArea.on(Phaser.Input.Events.POINTER_OUT, () => {
            this.inspectArea.setFrame(0);
        }, this);
        this.inspectArea.on(Phaser.Input.Events.POINTER_DOWN, (p, x, y, event) => {
            event.stopPropagation();
            if (this.scene.holding) {
                this.inspectHeldItem();
            }
        }, this);
        this.inspectArea.setVisible(false);

        
        this.putAwayArea = scene.add.image(640, 550, 'inv-put-away');
        this.putAwayArea.setInteractive();
        this.putAwayArea.on(Phaser.Input.Events.POINTER_OVER, () => {
            this.putAwayArea.setFrame(1);
        }, this);
        this.putAwayArea.on(Phaser.Input.Events.POINTER_OUT, () => {
            this.putAwayArea.setFrame(0);
        }, this);
        this.putAwayArea.on(Phaser.Input.Events.POINTER_DOWN, (p, x, y, event) => {
            event.stopPropagation();
            if (this.inspecting) {
                this.stopInspecting();
            }
        }, this);
        this.putAwayArea.setVisible(false);
        
        this.inspectArea
        scene.add.existing(this);
    }

    addItem(id) {
        let ii = new InventoryItem(
            this.scene,
            290 + 100*this.length,
            670,
            items[id]
        );

        this.scene.sfx.pickUp.play();

        this.add(ii);
    }

    inspectHeldItem() {


        let ii = this.scene.holding;
        if (this.inspecting) {
            this.inspecting.inspect.object.setVisible(false);
        }

        this.returnItem(ii);
        if (!ii.item.inspect.object) {
            ii.item.inspect.object = ii.item.inspect.init(this.scene);
            this.scene.inspectedObjects.add(ii.item.inspect.object);
        }
        this.inspecting = ii.item;
        ii.item.inspect.object.setVisible(true);
        this.bg.setVisible(true);
        this.inspectArea.setVisible(false);
        this.putAwayArea.setVisible(true);

        if (this.inspecting.id === 'glasses' && this.scene.bg.texture.key === '2-7') {
            this.bg.setVisible(false);
            this.scene.bg.setTexture('2-7_2');
        }
    }

    stopInspecting() {
        if (this.inspecting.id === 'glasses' && this.scene.bg.texture.key === '2-7_2') {
            this.scene.bg.setTexture('2-7');
        }
        this.putAwayArea.setVisible(false);
        this.bg.setVisible(false);
        this.inspecting.inspect.object.setVisible(false);
        this.inspecting = null;
    }

    clickItem(ii: InventoryItem) {
        if (this.scene.holding) {
            this.returnItem(this.scene.holding);
        }
        
        ii.setAlpha(0);
        this.scene.holding = ii;
        // @ts-ignore
        this.scene.cursor.setTexture(ii.image.texture);

        this.putAwayArea.setVisible(false);
        this.inspectArea.setVisible(true);
    }

    returnItem(ii: InventoryItem) {
        ii.setAlpha(1);
        this.scene.holding = null;
        this.scene.cursor.setTexture('cursor-click');
        this.inspectArea.setVisible(false);
    }

    destroyHeldItem() {
        this.scene.holding.destroy();        
        this.scene.cursor.setTexture('cursor-click');
        this.scene.inventory.inspectArea.setVisible(false);
        this.scene.holding = null;

        for (let i = 0; i < this.length; i++) {
            // @ts-ignore
            this.getAt(i).setPosition(290 + 100*i, 670);
        }
    }
}