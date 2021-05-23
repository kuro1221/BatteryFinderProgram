class View {
  static createBrandSelect() {
    let brandSelect = document.getElementById("brandSelect");
    let brandArr = [];
    for (let i = 0; i < camera.length; i++) {
      let brand = camera[i]["brand"];
      if (!brandArr.includes(camera[i]["brand"])) {
        brandArr.push(camera[i]["brand"]);
      }
    }

    for (let i = 0; i < brandArr.length; i++) {
      let brandItem = document.createElement("option");
      brandItem.value = brandArr[i];
      brandItem.innerHTML = brandArr[i];
      brandSelect.append(brandItem);
    }
  }

  static createModelSelect() {
    let modelSelect = document.getElementById("modelSelect");
    let brandSelect = document.getElementById("brandSelect").value;

    //選択肢を初期化
    modelSelect.innerHTML = "";

    for (let i = 0; i < camera.length; i++) {
      if (camera[i]["brand"] == brandSelect) {
        let modelItem = document.createElement("option");
        modelItem.value = camera[i]["model"];
        modelItem.innerHTML = camera[i]["model"];
        modelSelect.append(modelItem);
      }
    }
    Controller.changeInput();
  }

  static createBatteryList(canBatteryList, totalPW) {
    let batteryList = document.getElementById("batteryList");

    //選択肢を初期化
    batteryList.innerHTML = "";

    for (let i = 0; i < canBatteryList.length; i++) {
      let batteryItem = document.createElement("div");
      let estimatedTime = Controller.estimateBattery(
        canBatteryList[i],
        totalPW
      );

      batteryItem.innerHTML = `
      <div class="batteryItem d-flex justify-content-between">
        <span class="batteryName">${canBatteryList[i]["batteryName"]}</span>
        <span class="estimated">estimated ${estimatedTime} hours on selected setup</span>
      </div>
      `;
      batteryList.append(batteryItem);
    }
  }
}

class Controller {
  //カメラのハッシュマップを作成
  static createaCameraHash() {
    for (let i = 0; i < camera.length; i++) {
      cameraHash[camera[i]["model"]] = camera[i];
    }
  }

  //入力があった場合
  static changeInput() {
    let modelSelect = document.getElementById("modelSelect").value;
    let selectCamera = cameraHash[modelSelect];
    let accessoryPW = Number(document.getElementById("inputPower").value);
    let totalPW = accessoryPW + selectCamera["powerConsumptionWh"];
    let canBatteryList = Controller.filterBattery(totalPW);

    //バッテリーリストを更新する
    View.createBatteryList(canBatteryList, totalPW);
  }

  //使用可能なバッテリーを絞り込む
  static filterBattery(totalPW) {
    let canBatteryList = [];
    for (let i = 0; i < battery.length; i++) {
      let limitPW = battery[i]["maxDraw"] * battery[i]["endVoltage"];
      if (limitPW >= totalPW) canBatteryList.push(battery[i]);
    }
    return canBatteryList;
  }

  //バッテリーの最大持続可能時間を求める
  static estimateBattery(battery, totalPW) {
    let PW = battery["voltage"] * battery["capacityAh"];
    let estimatedTime = Math.floor((PW * 10) / totalPW) / 10;
    return estimatedTime;
  }
}

const battery = [
  {
    batteryName: "WKL-78",
    capacityAh: 2.3,
    voltage: 14.4,
    maxDraw: 3.2,
    endVoltage: 10,
  },
  {
    batteryName: "WKL-140",
    capacityAh: 4.5,
    voltage: 14.4,
    maxDraw: 9.2,
    endVoltage: 5,
  },
  {
    batteryName: "Wmacro-78",
    capacityAh: 2.5,
    voltage: 14.5,
    maxDraw: 10,
    endVoltage: 5,
  },
  {
    batteryName: "Wmacro-140",
    capacityAh: 3.6,
    voltage: 14.4,
    maxDraw: 14,
    endVoltage: 5,
  },
  {
    batteryName: "IOP-E78",
    capacityAh: 6.6,
    voltage: 14.4,
    maxDraw: 10.5,
    endVoltage: 8,
  },
  {
    batteryName: "IOP-E140",
    capacityAh: 9.9,
    voltage: 14.4,
    maxDraw: 14,
    endVoltage: 10,
  },
  {
    batteryName: "IOP-E188",
    capacityAh: 13.2,
    voltage: 14.4,
    maxDraw: 14,
    endVoltage: 11,
  },
  {
    batteryName: "RYN-C65",
    capacityAh: 4.9,
    voltage: 14.8,
    maxDraw: 4.9,
    endVoltage: 11,
  },
  {
    batteryName: "RYN-C85",
    capacityAh: 6.3,
    voltage: 14.4,
    maxDraw: 6.3,
    endVoltage: 12,
  },
  {
    batteryName: "RYN-C140",
    capacityAh: 9.8,
    voltage: 14.8,
    maxDraw: 10,
    endVoltage: 12,
  },
  {
    batteryName: "RYN-C290",
    capacityAh: 19.8,
    voltage: 14.4,
    maxDraw: 14,
    endVoltage: 12,
  },
];
const camera = [
  {
    brand: "Cakon",
    model: "ABC 3000M",
    powerConsumptionWh: 35.5,
  },
  {
    brand: "Cakon",
    model: "ABC 5000M",
    powerConsumptionWh: 37.2,
  },
  {
    brand: "Cakon",
    model: "ABC 7000M",
    powerConsumptionWh: 39.7,
  },
  {
    brand: "Cakon",
    model: "ABC 9000M",
    powerConsumptionWh: 10.9,
  },
  {
    brand: "Cakon",
    model: "ABC 9900M",
    powerConsumptionWh: 15.7,
  },
  {
    brand: "Go MN",
    model: "UIK 110C",
    powerConsumptionWh: 62.3,
  },
  {
    brand: "Go MN",
    model: "UIK 210C",
    powerConsumptionWh: 64.3,
  },
  {
    brand: "Go MN",
    model: "UIK 230C",
    powerConsumptionWh: 26.3,
  },
  {
    brand: "Go MN",
    model: "UIK 250C",
    powerConsumptionWh: 15.3,
  },
  {
    brand: "Go MN",
    model: "UIK 270C",
    powerConsumptionWh: 20.3,
  },
  {
    brand: "VANY",
    model: "CEV 1100P",
    powerConsumptionWh: 22,
  },
  {
    brand: "VANY",
    model: "CEV 1300P",
    powerConsumptionWh: 23,
  },
  {
    brand: "VANY",
    model: "CEV 1500P",
    powerConsumptionWh: 24,
  },
  {
    brand: "VANY",
    model: "CEV 1700P",
    powerConsumptionWh: 25,
  },
  {
    brand: "VANY",
    model: "CEV 1900P",
    powerConsumptionWh: 26,
  },
];

let cameraHash = {};
Controller.createaCameraHash();
View.createBrandSelect();
View.createModelSelect();
