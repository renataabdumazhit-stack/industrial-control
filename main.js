// =====================================================
// ПРОМЫШЛЕННЫЙ ЦЕНТР УПРАВЛЕНИЯ
// MAIN.JS
// =====================================================

import * as THREE from 'three';

import {
    OrbitControls
} from 'three/addons/controls/OrbitControls.js';


// =====================================================
// 1. ОСНОВНЫЕ ЭЛЕМЕНТЫ
// =====================================================

const sceneContainer =
    document.getElementById('scene-container');

const loadingScreen =
    document.getElementById('loading-screen');


// =====================================================
// 2. THREE.JS
// =====================================================

const scene =
    new THREE.Scene();

scene.background =
    new THREE.Color(0x0b131d);


const camera =
    new THREE.PerspectiveCamera(
        45,
        1,
        0.1,
        1000
    );

camera.position.set(
    10,
    7,
    12
);


const renderer =
    new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });

renderer.setPixelRatio(
    Math.min(
        window.devicePixelRatio,
        2
    )
);

renderer.setSize(
    sceneContainer.clientWidth,
    sceneContainer.clientHeight
);

renderer.shadowMap.enabled = true;

renderer.shadowMap.type =
    THREE.PCFSoftShadowMap;

sceneContainer.appendChild(
    renderer.domElement
);


// =====================================================
// 3. КАМЕРА И УПРАВЛЕНИЕ
// =====================================================

const controls =
    new OrbitControls(
        camera,
        renderer.domElement
    );

controls.enableDamping = true;

controls.dampingFactor = 0.06;

controls.minDistance = 6;

controls.maxDistance = 25;

controls.target.set(
    0,
    2,
    0
);


// =====================================================
// 4. ОСВЕЩЕНИЕ
// =====================================================

const ambientLight =
    new THREE.AmbientLight(
        0xffffff,
        1.5
    );

scene.add(
    ambientLight
);


const mainLight =
    new THREE.DirectionalLight(
        0xffffff,
        2.5
    );

mainLight.position.set(
    8,
    14,
    10
);

mainLight.castShadow = true;

scene.add(
    mainLight
);
// =====================================================
// 12.12. ДОПОЛНИТЕЛЬНОЕ ПРОМЫШЛЕННОЕ ОСВЕЩЕНИЕ
// =====================================================

const topLight =
    new THREE.PointLight(
        0xffffff,
        2.5,
        18
    );

topLight.position.set(
    0,
    8,
    3
);

scene.add(topLight);


const sideLight =
    new THREE.PointLight(
        0x8ab4ff,
        1.5,
        15
    );

sideLight.position.set(
    -6,
    4,
    4
);

scene.add(sideLight);


const backLight =
    new THREE.PointLight(
        0xffa45b,
        1.2,
        14
    );

backLight.position.set(
    5,
    5,
    -5
);

scene.add(backLight);



const blueLight =
    new THREE.PointLight(
        0x3d9cff,
        18,
        30
    );

blueLight.position.set(
    -5,
    5,
    3
);

scene.add(
    blueLight
);


// =====================================================
// 5. МАТЕРИАЛЫ
// =====================================================

const metalMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x6f7d87,
        metalness: 0.75,
        roughness: 0.32
    });


const darkMetalMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x27343f,
        metalness: 0.8,
        roughness: 0.3
    });


const blueMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x238de0,
        metalness: 0.45,
        roughness: 0.28,
        emissive: 0x082d4f,
        emissiveIntensity: 0.4
    });


const warningMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x8c7440,
        metalness: 0.55,
        roughness: 0.35
    });


const whiteMaterial =
    new THREE.MeshStandardMaterial({
        color: 0xd6dde1,
        metalness: 0.4,
        roughness: 0.3
    });


// =====================================================
// 6. ПОЛ
// =====================================================

const floor =
    new THREE.Mesh(
        new THREE.PlaneGeometry(
            30,
            30
        ),
        new THREE.MeshStandardMaterial({
            color: 0x0c151f,
            roughness: 0.8,
            metalness: 0.15
        })
    );

floor.rotation.x =
    -Math.PI / 2;

floor.position.y = 0;

floor.receiveShadow = true;

scene.add(
    floor
);


// Сетка

const grid =
    new THREE.GridHelper(
        26,
        26,
        0x315064,
        0x1c2d39
    );

grid.position.y =
    0.01;

scene.add(
    grid
);


// =====================================================
// 7. ОСНОВНЫЕ ГРУППЫ
// =====================================================

const equipment =
    new THREE.Group();

scene.add(
    equipment
);


const drillDownGroup =
    new THREE.Group();

drillDownGroup.visible =
    false;

scene.add(
    drillDownGroup
);


// =====================================================
// 8. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// =====================================================

function createBox(
    width,
    height,
    depth,
    material
) {

    const mesh =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                width,
                height,
                depth
            ),
            material
        );

    mesh.castShadow = true;

    mesh.receiveShadow = true;

    return mesh;
}


function createCylinder(
    radius,
    height,
    material
) {

    const mesh =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                radius,
                radius,
                height,
                32
            ),
            material
        );

    mesh.castShadow = true;

    mesh.receiveShadow = true;

    return mesh;
}


function createIndicator(
    color
) {

    const material =
        new THREE.MeshStandardMaterial({
            color: color,
            emissive: color,
            emissiveIntensity: 2
        });

    return new THREE.Mesh(
        new THREE.SphereGeometry(
            0.09,
            16,
            16
        ),
        material
    );
}


// =====================================================
// 9. ГЛАВНЫЙ ПРОИЗВОДСТВЕННЫЙ БЛОК M-101
// =====================================================

const mainMachine =
    new THREE.Group();

mainMachine.position.set(
    0,
    0,
    0
);


const machineBase =
    createBox(
        3.4,
        0.7,
        2.7,
        darkMetalMaterial
    );

machineBase.position.y =
    0.35;

mainMachine.add(
    machineBase
);


const machineBody =
    createBox(
        2.6,
        2.4,
        2,
        metalMaterial
    );

machineBody.position.y =
    1.9;

mainMachine.add(
    machineBody
);


const machineTop =
    createBox(
        1.8,
        0.35,
        1.5,
        whiteMaterial
    );

machineTop.position.y =
    3.25;

mainMachine.add(
    machineTop
);


const mainIndicator =
    createIndicator(
        0x62df91
    );

mainIndicator.position.set(
    1.15,
    2.5,
    1.03
);

mainMachine.add(
    mainIndicator
);


mainMachine.userData = {
    name: 'Производственный блок M-101',
    status: 'Работает',
    temperature: 72,
    efficiency: 94.7,
    type: 'Производственный блок'
};

equipment.add(
    mainMachine
);


// =====================================================
// 10. ОХЛАЖДАЮЩИЙ МОДУЛЬ C-204
// =====================================================

const sideTank =
    new THREE.Group();

sideTank.position.set(
    -3.8,
    0,
    1
);


const tankBody =
    createCylinder(
        0.65,
        2.7,
        blueMaterial
    );

tankBody.position.y =
    1.35;

sideTank.add(
    tankBody
);


const tankTop =
    new THREE.Mesh(
        new THREE.SphereGeometry(
            0.65,
            32,
            16,
            0,
            Math.PI * 2,
            0,
            Math.PI / 2
        ),
        whiteMaterial
    );

tankTop.position.y =
    2.7;

sideTank.add(
    tankTop
);


const tankIndicator =
    createIndicator(
        0x62df91
    );

tankIndicator.position.set(
    0.66,
    1.7,
    0
);

sideTank.add(
    tankIndicator
);


sideTank.userData = {
    name: 'Охлаждающий модуль C-204',
    status: 'Активен',
    temperature: 24,
    efficiency: 91.2,
    type: 'Система охлаждения'
};

equipment.add(
    sideTank
);


// =====================================================
// 11. РЕЗЕРВУАР P-302
// =====================================================

const pressureTank =
    new THREE.Group();

pressureTank.position.set(
    4,
    0,
    1
);


const pressureBody =
    createCylinder(
        0.7,
        2.9,
        warningMaterial
    );

pressureBody.position.y =
    1.45;

pressureTank.add(
    pressureBody
);


const pressureTop =
    new THREE.Mesh(
        new THREE.SphereGeometry(
            0.7,
            32,
            16,
            0,
            Math.PI * 2,
            0,
            Math.PI / 2
        ),
        darkMetalMaterial
    );

pressureTop.position.y =
    2.9;

pressureTank.add(
    pressureTop
);


const pressureIndicator =
    createIndicator(
        0xe6b84d
    );

pressureIndicator.position.set(
    0.71,
    1.8,
    0
);

pressureTank.add(
    pressureIndicator
);


pressureTank.userData = {
    name: 'Резервуар высокого давления P-302',
    status: 'Внимание',
    temperature: 84,
    pressure: 8.4,
    efficiency: 78.6,
    type: 'Система высокого давления'
};

equipment.add(
    pressureTank
);


// =====================================================
// 12. ТРУБЫ
// =====================================================

const pipeMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x9ca8ad,
        metalness: 0.85,
        roughness: 0.25
    });


function createPipe(
    x,
    y,
    z,
    length,
    rotationZ = 0
) {

    const pipe =
        createCylinder(
            0.12,
            length,
            pipeMaterial
        );

    pipe.position.set(
        x,
        y,
        z
    );

    pipe.rotation.z =
        rotationZ;

    equipment.add(
        pipe
    );
}


createPipe(
    -2,
    2.5,
    0,
    3,
    Math.PI / 2
);

createPipe(
    2.1,
    2.2,
    0,
    2.7,
    Math.PI / 2
);

createPipe(
    0,
    3.8,
    0,
    2.5,
    0
);
// =====================================================
// 12.5. ПРОМЫШЛЕННАЯ ПЛАТФОРМА И ОПОРЫ
// =====================================================

const platformMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x394752,
        metalness: 0.8,
        roughness: 0.35
    });


const platform =
    createBox(
        10,
        0.25,
        7,
        platformMaterial
    );

platform.position.set(
    0,
    0.65,
    0
);

equipment.add(
    platform
);


// =====================================================
// ОПОРЫ ПЛАТФОРМЫ
// =====================================================

const supportPositions = [
    [-4, 0, -2.5],
    [4, 0, -2.5],
    [-4, 0, 2.5],
    [4, 0, 2.5]
];


supportPositions.forEach(
    ([x, y, z]) => {

        const support =
            createBox(
                0.35,
                1.3,
                0.35,
                darkMetalMaterial
            );

        support.position.set(
            x,
            0.0,
            z
        );

        equipment.add(
            support
        );

    }
);


// =====================================================
// ПЕРИЛА
// =====================================================

const railingMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x7f8c93,
        metalness: 0.75,
        roughness: 0.3
    });


function createRail(
    x,
    y,
    z,
    width,
    rotationY = 0
) {

    const rail =
        createBox(
            width,
            0.12,
            0.12,
            railingMaterial
        );

    rail.position.set(
        x,
        y,
        z
    );

    rail.rotation.y =
        rotationY;

    equipment.add(
        rail
    );

}


// Переднее ограждение

createRail(
    0,
    2.0,
    -3.5,
    10
);


// Заднее ограждение

createRail(
    0,
    2.0,
    3.5,
    10
);


// Боковые ограждения

createRail(
    -5,
    2.0,
    0,
    7,
    Math.PI / 2
);

createRail(
    5,
    2.0,
    0,
    7,
    Math.PI / 2
);
// =====================================================
// 12.6. ПРОМЫШЛЕННЫЕ ТРУБЫ
// =====================================================

const industrialPipeMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x8f9ba1,
        metalness: 0.85,
        roughness: 0.25
    });


// Создание горизонтальной трубы

function createIndustrialPipe(
    start,
    end,
    radius = 0.12
) {

    const direction =
        new THREE.Vector3()
            .subVectors(
                end,
                start
            );


    const length =
        direction.length();


    const pipe =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                radius,
                radius,
                length,
                24
            ),
            industrialPipeMaterial
        );


    pipe.position.copy(
        start
            .clone()
            .add(
                end
                    .clone()
                    .sub(start)
                    .multiplyScalar(0.5)
            )
    );


    pipe.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        direction.normalize()
    );


    pipe.castShadow = true;

    pipe.receiveShadow = true;


    equipment.add(
        pipe
    );


    return pipe;
}


// =====================================================
// ТРУБА M-101 → C-204
// =====================================================

createIndustrialPipe(
    new THREE.Vector3(
        -1.4,
        2.3,
        0
    ),

    new THREE.Vector3(
        -3.1,
        2.3,
        1
    ),

    0.14
);


// =====================================================
// ТРУБА M-101 → P-302
// =====================================================

createIndustrialPipe(
    new THREE.Vector3(
        1.4,
        2.3,
        0
    ),

    new THREE.Vector3(
        3.4,
        2.3,
        1
    ),

    0.14
);


// =====================================================
// ВЕРТИКАЛЬНАЯ ТРУБА НАД M-101
// =====================================================

createIndustrialPipe(
    new THREE.Vector3(
        0,
        3.4,
        0
    ),

    new THREE.Vector3(
        0,
        5.2,
        0
    ),

    0.16
);


// =====================================================
// ВЕРХНЯЯ СОЕДИНИТЕЛЬНАЯ ТРУБА
// =====================================================

createIndustrialPipe(
    new THREE.Vector3(
        0,
        5.2,
        0
    ),

    new THREE.Vector3(
        3.4,
        5.2,
        1
    ),

    0.13
);
// =====================================================
// 12.7. ЛЕСТНИЦА И ТЕХНИЧЕСКАЯ ПЛОЩАДКА
// =====================================================

const stairMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x596771,
        metalness: 0.8,
        roughness: 0.35
    });


// =====================================================
// ТЕХНИЧЕСКАЯ ПЛОЩАДКА
// =====================================================

const servicePlatform =
    createBox(
        2.8,
        0.18,
        2.2,
        stairMaterial
    );

servicePlatform.position.set(
    -3.8,
    3.1,
    1
);

equipment.add(
    servicePlatform
);


// =====================================================
// ОПОРЫ ПЛОЩАДКИ
// =====================================================

const platformSupportPositions = [
    [-4.8, 1.8, 0.2],
    [-2.8, 1.8, 0.2],
    [-4.8, 1.8, 1.8],
    [-2.8, 1.8, 1.8]
];


platformSupportPositions.forEach(
    ([x, y, z]) => {

        const support =
            createBox(
                0.16,
                2.6,
                0.16,
                darkMetalMaterial
            );

        support.position.set(
            x,
            y,
            z
        );

        equipment.add(
            support
        );

    }
);


// =====================================================
// СТУПЕНЬКИ ЛЕСТНИЦЫ
// =====================================================

for (
    let i = 0;
    i < 7;
    i++
) {

    const step =
        createBox(
            1.3,
            0.12,
            0.42,
            stairMaterial
        );


    step.position.set(
        -5.0,
        0.85 + i * 0.32,
        0.9 + i * 0.25
    );


    step.rotation.x =
        0;


    equipment.add(
        step
    );

}


// =====================================================
// БОКОВЫЕ ПЕРИЛА ЛЕСТНИЦЫ
// =====================================================

const stairRailLeft =
    createBox(
        0.08,
        2.6,
        2.1,
        railingMaterial
    );

stairRailLeft.position.set(
    -5.65,
    1.8,
    1.65
);

stairRailLeft.rotation.x =
    -0.15;

equipment.add(
    stairRailLeft
);


const stairRailRight =
    createBox(
        0.08,
        2.6,
        2.1,
        railingMaterial
    );

stairRailRight.position.set(
    -4.35,
    1.8,
    1.65
);

stairRailRight.rotation.x =
    -0.15;

equipment.add(
    stairRailRight
);
// =====================================================
// 12.8. ШКАФ УПРАВЛЕНИЯ
// =====================================================

const controlPanelMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x263238,
        metalness: 0.7,
        roughness: 0.3
    });

const controlPanel =
    createBox(
        1.4,
        2.4,
        0.45,
        controlPanelMaterial
    );

controlPanel.position.set(
    4.2,
    1.8,
    -1.2
);

equipment.add(controlPanel);


// Экран
const screenMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x123b4a,
        emissive: 0x0b5368,
        emissiveIntensity: 1.2,
        metalness: 0.2,
        roughness: 0.25
    });

const screen =
    createBox(
        0.85,
        0.55,
        0.06,
        screenMaterial
    );

screen.position.set(
    4.2,
    2.35,
    -0.94
);

equipment.add(screen);


// Индикаторы
const indicatorColors = [
    0x22c55e,
    0xfacc15,
    0xef4444
];

indicatorColors.forEach(
    (color, index) => {

        const indicatorMaterial =
            new THREE.MeshStandardMaterial({
                color: color,
                emissive: color,
                emissiveIntensity: 0.8
            });

        const indicator =
            new THREE.Mesh(
                new THREE.SphereGeometry(
                    0.09,
                    16,
                    16
                ),
                indicatorMaterial
            );

        indicator.position.set(
            3.85 + index * 0.35,
            1.75,
            -0.94
        );

        equipment.add(indicator);
    }
);


// Кнопки управления
for (
    let i = 0;
    i < 4;
    i++
) {

    const buttonMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x4b5563,
            metalness: 0.6,
            roughness: 0.35
        });

    const button =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.09,
                0.09,
                0.08,
                20
            ),
            buttonMaterial
        );

    button.rotation.x =
        Math.PI / 2;

    button.position.set(
        3.82 + (i % 2) * 0.35,
        1.35 - Math.floor(i / 2) * 0.35,
        -0.94
    );

    equipment.add(button);
}
// =====================================================
// 12.9. МАНОМЕТРЫ И ДАТЧИКИ
// =====================================================

const gaugeBodyMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x303a40,
        metalness: 0.8,
        roughness: 0.25
    });

const gaugeFaceMaterial =
    new THREE.MeshStandardMaterial({
        color: 0xd9e0e3,
        metalness: 0.15,
        roughness: 0.35
    });

function createGauge(x, y, z) {

    const body =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.38,
                0.38,
                0.18,
                32
            ),
            gaugeBodyMaterial
        );

    body.rotation.x =
        Math.PI / 2;

    body.position.set(
        x,
        y,
        z
    );

    equipment.add(body);


    const face =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.30,
                0.30,
                0.04,
                32
            ),
            gaugeFaceMaterial
        );

    face.rotation.x =
        Math.PI / 2;

    face.position.set(
        x,
        y,
        z - 0.11
    );

    equipment.add(face);


    // Центральная стрелка
    const needleMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xd62828,
            metalness: 0.3,
            roughness: 0.4
        });

    const needle =
        createBox(
            0.04,
            0.22,
            0.025,
            needleMaterial
        );

    needle.position.set(
        x,
        y + 0.07,
        z - 0.15
    );

    needle.rotation.z =
        -0.55;

    equipment.add(needle);
}


// Манометр на основной машине
createGauge(
    -1.45,
    3.35,
    -0.45
);

// Манометр возле бака
createGauge(
    3.25,
    3.0,
    0.65
);
// =====================================================
// 12.10. СИГНАЛЬНЫЕ МАЯКИ
// =====================================================

function createBeacon(x, y, z, color) {

    const baseMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x252b30,
            metalness: 0.8,
            roughness: 0.3
        });

    const base =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.16,
                0.16,
                0.12,
                20
            ),
            baseMaterial
        );

    base.position.set(
        x,
        y,
        z
    );

    equipment.add(base);


    const beaconMaterial =
        new THREE.MeshStandardMaterial({
            color: color,
            emissive: color,
            emissiveIntensity: 1.5,
            transparent: true,
            opacity: 0.9
        });

    const beacon =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.12,
                0.12,
                0.28,
                20
            ),
            beaconMaterial
        );

    beacon.position.set(
        x,
        y + 0.2,
        z
    );

    equipment.add(beacon);

    return beacon;
}


// Зелёный рабочий сигнал
createBeacon(
    0,
    5.45,
    0,
    0x22c55e
);


// Жёлтый сигнал на боковом модуле
createBeacon(
    3.4,
    2.9,
    1,
    0xfacc15
);
// =====================================================
// 12.11. КАБЕЛИ И ПРОВОДКА
// =====================================================

const cableMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x15191c,
        metalness: 0.25,
        roughness: 0.7
    });

function createCable(start, end, radius = 0.045) {

    const direction =
        new THREE.Vector3()
            .subVectors(end, start);

    const length =
        direction.length();

    const cable =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                radius,
                radius,
                length,
                12
            ),
            cableMaterial
        );

    cable.position.copy(
        start.clone().add(
            end.clone()
                .sub(start)
                .multiplyScalar(0.5)
        )
    );

    cable.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        direction.normalize()
    );

    equipment.add(cable);

    return cable;
}


// Кабель от шкафа управления к основной машине
createCable(
    new THREE.Vector3(3.55, 1.2, -0.95),
    new THREE.Vector3(1.4, 1.4, -0.4)
);


// Кабель к верхнему датчику
createCable(
    new THREE.Vector3(0.1, 4.9, 0),
    new THREE.Vector3(0.1, 5.45, 0)
);


// Кабель к боковому модулю
createCable(
    new THREE.Vector3(3.4, 2.7, 0.95),
    new THREE.Vector3(4.1, 2.2, 0.95)
);

// =====================================================
// 12.13. ПРЕДУПРЕЖДАЮЩАЯ РАЗМЕТКА
// =====================================================

const hazardYellowMaterial =
    new THREE.MeshStandardMaterial({
        color: 0xf2c94c,
        metalness: 0.3,
        roughness: 0.45
    });

const hazardBlackMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x171a1c,
        metalness: 0.4,
        roughness: 0.5
    });


// Жёлто-чёрные полосы на передней части платформы
for (
    let i = 0;
    i < 10;
    i++
) {

    const stripe =
        createBox(
            0.7,
            0.04,
            0.35,
            i % 2 === 0
                ? hazardYellowMaterial
                : hazardBlackMaterial
        );

    stripe.position.set(
        -3.15 + i * 0.7,
        0.79,
        -3.5
    );

    stripe.rotation.y =
        -Math.PI / 6;

    equipment.add(stripe);
}
// =====================================================
// 12.14. ПРОМЫШЛЕННЫЕ ДАТЧИКИ
// =====================================================

const sensorBodyMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x20282d,
        metalness: 0.75,
        roughness: 0.3
    });

const sensorActiveMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x00b4d8,
        emissive: 0x00b4d8,
        emissiveIntensity: 1.5,
        metalness: 0.3,
        roughness: 0.25
    });

function createSensor(x, y, z) {

    const body =
        createBox(
            0.32,
            0.32,
            0.18,
            sensorBodyMaterial
        );

    body.position.set(
        x,
        y,
        z
    );

    equipment.add(body);


    const indicator =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.07,
                16,
                16
            ),
            sensorActiveMaterial
        );

    indicator.position.set(
        x,
        y,
        z - 0.11
    );

    equipment.add(indicator);
}


// Датчик температуры
createSensor(
    -1.55,
    2.65,
    -0.35
);


// Датчик нагрузки
createSensor(
    1.45,
    2.15,
    -0.35
);


// Датчик давления
createSensor(
    3.35,
    2.25,
    0.65
);


// Дополнительный датчик сверху
createSensor(
    0,
    4.65,
    0
);
// =====================================================
// 12.15. ДИНАМИЧЕСКИЕ ИНДИКАТОРЫ ДАТЧИКОВ
// =====================================================

// =====================================================
// 12.17. СОСТОЯНИЕ ДАТЧИКОВ ПО ТЕМПЕРАТУРЕ
// =====================================================

let sensorPulse = 0;

function updateSensorState() {

    const temperature =
        currentTemperature;

    let color;

    if (temperature < 70) {

        color = 0x22c55e;

    } else if (temperature < 85) {

        color = 0xfacc15;

    } else {

        color = 0xef4444;
    }

    sensorActiveMaterial.color.setHex(
        color
    );

    sensorActiveMaterial.emissive.setHex(
        color
    );
}


setInterval(() => {

    sensorPulse += 0.08;

    const intensity =
        1.2 +
        Math.sin(sensorPulse) * 0.7;

    sensorActiveMaterial.emissiveIntensity =
        intensity;

    updateSensorState();

}, 100);

// =====================================================
// 12.18. СОСТОЯНИЕ ПО НАГРУЗКЕ
// =====================================================

function updateLoadState() {

    const load =
        currentLoad;

    let color;

    if (load < 70) {

        color = 0x22c55e;

    } else if (load < 90) {

        color = 0xfacc15;

    } else {

        color = 0xef4444;
    }

    sensorActiveMaterial.color.setHex(
        color
    );

    sensorActiveMaterial.emissive.setHex(
        color
    );
}
// =====================================================
// 12.20. 3D ПАНЕЛИ ДАННЫХ
// =====================================================

const dataPanelMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x101820,
        metalness: 0.7,
        roughness: 0.3,
        emissive: 0x061018,
        emissiveIntensity: 0.4
    });

const dataScreenMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x0ea5e9,
        emissive: 0x0ea5e9,
        emissiveIntensity: 1.4,
        metalness: 0.2,
        roughness: 0.25
    });

function createDataPanel(x, y, z) {

    const panel =
        createBox(
            1.5,
            0.8,
            0.12,
            dataPanelMaterial
        );

    panel.position.set(
        x,
        y,
        z
    );

    equipment.add(panel);


    const screen =
        createBox(
            1.15,
            0.42,
            0.04,
            dataScreenMaterial
        );

    screen.position.set(
        x,
        y,
        z - 0.08
    );

    equipment.add(screen);
}


// Панель температуры
createDataPanel(
    -2.2,
    3.8,
    -0.6
);


// Панель нагрузки
createDataPanel(
    2.0,
    3.2,
    -0.5
);


// Панель давления
createDataPanel(
    3.8,
    3.6,
    0.8
);
// =====================================================
// 12.21. ИНФОРМАЦИОННЫЕ МЕТРИКИ
// =====================================================

const metricGroup = new THREE.Group();

metricGroup.position.set(
    0,
    0,
    0
);

equipment.add(metricGroup);
// =====================================================
// 12.22. ТЕКСТОВЫЕ 3D-ДИСПЛЕИ
// =====================================================

function createMetricTexture(label, value) {

    const canvas =
        document.createElement('canvas');

    canvas.width = 512;
    canvas.height = 220;

    const ctx =
        canvas.getContext('2d');

    ctx.fillStyle = '#071018';
    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.fillStyle = '#6ee7f9';
    ctx.font = 'bold 42px Arial';

    ctx.fillText(
        label,
        25,
        60
    );

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 58px Arial';

    ctx.fillText(
        value,
        25,
        135
    );

    const texture =
        new THREE.CanvasTexture(canvas);

    texture.needsUpdate = true;

    return texture;
}


function createMetricDisplay(
    x,
    y,
    z,
    label,
    value
) {

    const material =
        new THREE.MeshBasicMaterial({
            map: createMetricTexture(
                label,
                value
            ),
            transparent: true
        });

    const display =
        new THREE.Mesh(
            new THREE.PlaneGeometry(
                1.15,
                0.5
            ),
            material
        );

    display.position.set(
        x,
        y,
        z
    );

    equipment.add(display);

    return display;
}


const temperatureDisplay =
    createMetricDisplay(
        -2.2,
        3.8,
        -0.68,
        'TEMP',
        '72 °C'
    );


const loadDisplay =
    createMetricDisplay(
        2.0,
        3.2,
        -0.58,
        'LOAD',
        '64 %'
    );


const pressureDisplay =
    createMetricDisplay(
        3.8,
        3.6,
        0.72,
        'PRESSURE',
        '5.4 BAR'
    );

    // =====================================================
// 12.26. ТЕХНОЛОГИЧЕСКИЙ ГОРЯЧИЙ УЗЕЛ
// =====================================================

const heatMaterial =
    new THREE.MeshStandardMaterial({
        color: 0xff6b1a,
        emissive: 0xff3d00,
        emissiveIntensity: 1.5,
        transparent: true,
        opacity: 0.85,
        metalness: 0.2,
        roughness: 0.25
    });

const heatGlow =
    new THREE.Mesh(
        new THREE.SphereGeometry(
            0.45,
            24,
            24
        ),
        heatMaterial
    );

heatGlow.position.set(
    0,
    5.25,
    0
);

equipment.add(heatGlow);


// Пульсация теплового узла
let heatPulse = 0;

setInterval(() => {

    heatPulse += 0.08;

    const pulse =
        1.2 +
        Math.sin(heatPulse) * 0.5;

    heatMaterial.emissiveIntensity =
        pulse;

    const scale =
        1 +
        Math.sin(heatPulse) * 0.08;

    heatGlow.scale.set(
        scale,
        scale,
        scale
    );

}, 50);
// =====================================================
// 12.28. ПАР ИЗ ТЕХНОЛОГИЧЕСКОЙ ТРУБЫ
// =====================================================

const steamMaterial =
    new THREE.MeshBasicMaterial({
        color: 0xd9e3e8,
        transparent: true,
        opacity: 0.22
    });

const steamParticles = [];

for (let i = 0; i < 18; i++) {

    const particle =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.10 + Math.random() * 0.08,
                12,
                12
            ),
            steamMaterial
        );

    particle.position.set(
        (Math.random() - 0.5) * 0.35,
        5.25 + Math.random() * 0.8,
        (Math.random() - 0.5) * 0.35
    );

    particle.userData.speed =
        0.004 + Math.random() * 0.006;

    particle.userData.offset =
        Math.random() * Math.PI * 2;

    equipment.add(particle);

    steamParticles.push(particle);
}


// Анимация пара
setInterval(() => {

    steamParticles.forEach(
        (particle) => {

            particle.position.y +=
                particle.userData.speed;

            particle.position.x +=
                Math.sin(
                    Date.now() * 0.001 +
                    particle.userData.offset
                ) * 0.0015;

            particle.scale.multiplyScalar(
                1.003
            );

            // Возвращаем частицу вниз
            if (
                particle.position.y > 7
            ) {

                particle.position.y =
                    5.25;

                particle.position.x =
                    (Math.random() - 0.5) * 0.35;

                particle.position.z =
                    (Math.random() - 0.5) * 0.35;

                particle.scale.set(
                    1,
                    1,
                    1
                );
            }
        }
    );

}, 30);
// =====================================================
// 12.29. ВРАЩАЮЩИЙСЯ ТЕХНОЛОГИЧЕСКИЙ МЕХАНИЗМ
// =====================================================

const rotorGroup =
    new THREE.Group();

rotorGroup.position.set(
    1.8,
    1.25,
    -0.45
);

equipment.add(rotorGroup);


// Центральный корпус
const rotorBodyMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x343d43,
        metalness: 0.9,
        roughness: 0.22
    });

const rotorBody =
    new THREE.Mesh(
        new THREE.CylinderGeometry(
            0.48,
            0.48,
            0.35,
            32
        ),
        rotorBodyMaterial
    );

rotorBody.rotation.z =
    Math.PI / 2;

rotorGroup.add(rotorBody);
// =====================================================
// ЗАЩИТНЫЙ КОЖУХ РОТОРА
// =====================================================

const rotorCoverMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x202a30,
        metalness: 0.9,
        roughness: 0.2,
        transparent: true,
        opacity: 0.38
    });

const rotorCover =
    new THREE.Mesh(
        new THREE.CylinderGeometry(
            0.68,
            0.68,
            0.16,
            32
        ),
        rotorCoverMaterial
    );

rotorCover.rotation.z =
    Math.PI / 2;

rotorCover.position.x =
    0.18;

rotorGroup.add(
    rotorCover
);


// Центральная крышка

const rotorCapMaterial =
    new THREE.MeshStandardMaterial({
        color: 0xb0bec5,
        metalness: 1,
        roughness: 0.16
    });

const rotorCap =
    new THREE.Mesh(
        new THREE.CylinderGeometry(
            0.22,
            0.22,
            0.22,
            32
        ),
        rotorCapMaterial
    );

rotorCap.rotation.z =
    Math.PI / 2;

rotorCap.position.x =
    0.32;

rotorGroup.add(
    rotorCap
);


// Центральная ось
const rotorAxisMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x9aa5aa,
        metalness: 1,
        roughness: 0.18
    });

const rotorAxis =
    new THREE.Mesh(
        new THREE.CylinderGeometry(
            0.12,
            0.12,
            0.65,
            20
        ),
        rotorAxisMaterial
    );

rotorAxis.rotation.z =
    Math.PI / 2;

rotorGroup.add(rotorAxis);


// Лопасти
const bladeMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x68757c,
        metalness: 0.85,
        roughness: 0.28
    });

for (let i = 0; i < 6; i++) {

    const blade =
        createBox(
            0.08,
            0.75,
            0.16,
            bladeMaterial
        );

    blade.position.set(
        0,
        Math.cos(
            i * Math.PI / 3
        ) * 0.34,
        Math.sin(
            i * Math.PI / 3
        ) * 0.34
    );

    blade.rotation.x =
        i * Math.PI / 3;

    rotorGroup.add(blade);
}


// Вращение механизма
setInterval(() => {

    rotorGroup.rotation.x += 0.035;

}, 30);
// =====================================================
// 12.30. УСИЛЕНИЕ МЕТАЛЛИЧЕСКИХ МАТЕРИАЛОВ
// =====================================================

const metalMaterials = [
    darkMetalMaterial,
    platformMaterial,
    railingMaterial,
    industrialPipeMaterial,
    stairMaterial,
    rotorBodyMaterial,
    rotorAxisMaterial,
    bladeMaterial
];

metalMaterials.forEach((material) => {

    if (material) {

        material.metalness = Math.min(
            material.metalness + 0.1,
            1
        );

        material.roughness = Math.max(
            material.roughness - 0.05,
            0.15
        );

    }
});
// =====================================================
// 12.31. ЗАЩИТНОЕ СТЕКЛО МАНОМЕТРОВ
// =====================================================

const gaugeGlassMaterial =
    new THREE.MeshPhysicalMaterial({
        color: 0xbfe9ff,
        transparent: true,
        opacity: 0.22,
        roughness: 0.08,
        metalness: 0,
        transmission: 0.65,
        thickness: 0.05
    });

function createGaugeGlass(x, y, z) {

    const glass =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.31,
                0.31,
                0.035,
                32
            ),
            gaugeGlassMaterial
        );

    glass.rotation.x =
        Math.PI / 2;

    glass.position.set(
        x,
        y,
        z
    );

    equipment.add(glass);
}


// Стекло первого манометра
createGaugeGlass(
    -1.45,
    3.35,
    -0.58
);


// Стекло второго манометра
createGaugeGlass(
    3.25,
    3.0,
    0.52
);
// =====================================================
// 12.32. ШЕЙДЕРНОЕ ПЛАМЯ
// =====================================================

const flameUniforms = {
    time: {
        value: 0
    }
};

const flameMaterial =
    new THREE.ShaderMaterial({

        transparent: true,

        depthWrite: false,

        blending:
            THREE.AdditiveBlending,

        uniforms:
            flameUniforms,

        vertexShader: `
            varying vec2 vUv;

            void main() {

                vUv = uv;

                gl_Position =
                    projectionMatrix *
                    modelViewMatrix *
                    vec4(position, 1.0);
            }
        `,

        fragmentShader: `
            uniform float time;

            varying vec2 vUv;

            void main() {

                float wave =
                    sin(
                        vUv.y * 12.0 +
                        time * 5.0
                    ) * 0.08;

                float width =
                    1.0 - vUv.y;

                float flame =
                    smoothstep(
                        0.45,
                        0.0,
                        abs(
                            vUv.x - 0.5 + wave
                        )
                    );

                flame *=
                    smoothstep(
                        0.0,
                        0.25,
                        width
                    );

                flame *=
                    smoothstep(
                        1.0,
                        0.25,
                        vUv.y
                    );

                vec3 color =
                    mix(
                        vec3(1.0, 0.15, 0.01),
                        vec3(1.0, 0.75, 0.05),
                        vUv.y
                    );

                gl_FragColor =
                    vec4(
                        color,
                        flame * 0.85
                    );
            }
        `
    });


const flame =
    new THREE.Mesh(
        new THREE.PlaneGeometry(
            0.9,
            1.8,
            20,
            20
        ),
        flameMaterial
    );

flame.position.set(
    0,
    6.0,
    0
);

equipment.add(flame);


// Анимация пламени
setInterval(() => {

    flameUniforms.time.value +=
        0.05;

}, 30);

// =====================================================
// 12.34. ДВИЖЕНИЕ ТЕХНОЛОГИЧЕСКОГО ПОТОКА
// =====================================================

const flowMaterial =
    new THREE.MeshBasicMaterial({
        color: 0x00d9ff,
        transparent: true,
        opacity: 0.9
    });

const flowParticles = [];

for (let i = 0; i < 14; i++) {

    const particle =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.06,
                10,
                10
            ),
            flowMaterial
        );

    particle.position.set(
        -1.4 + i * 0.22,
        2.3,
        0
    );

    particle.userData.progress =
        i / 14;

    equipment.add(particle);

    flowParticles.push(
        particle
    );
}


// Анимация потока
setInterval(() => {

    flowParticles.forEach(
        (particle) => {

            particle.userData.progress +=
                0.012;

            if (
                particle.userData.progress > 1
            ) {
                particle.userData.progress = 0;
            }

            const p =
                particle.userData.progress;

            particle.position.x =
                -1.4 + p * 2.8;

            particle.position.y =
                2.3 +
                Math.sin(p * Math.PI) * 0.35;

            particle.position.z =
                Math.sin(p * Math.PI * 2) * 0.18;
        }
    );

}, 30);
// =====================================================
// 12.35. ПРОМЫШЛЕННЫЙ ТУМАН
// =====================================================

scene.fog =
    new THREE.FogExp2(
        0x0b1117,
        0.018
    );
    // =====================================================
// 12.36. СТАТУС ПРОИЗВОДСТВЕННОГО ПРОЦЕССА
// =====================================================

const processStatusCanvas =
    document.createElement('canvas');

processStatusCanvas.width = 512;
processStatusCanvas.height = 180;

const processStatusContext =
    processStatusCanvas.getContext('2d');

const processStatusTexture =
    new THREE.CanvasTexture(
        processStatusCanvas
    );

const processStatusMaterial =
    new THREE.MeshBasicMaterial({
        map: processStatusTexture,
        transparent: true
    });

const processStatusDisplay =
    new THREE.Mesh(
        new THREE.PlaneGeometry(
            2.4,
            0.85
        ),
        processStatusMaterial
    );

processStatusDisplay.position.set(
    0,
    6.8,
    0
);

equipment.add(
    processStatusDisplay
);


const processStates = [
    {
        title: 'ПРОИЗВОДСТВО',
        status: 'ЗАПУСК',
        color: '#facc15'
    },
    {
        title: 'ПРОИЗВОДСТВО',
        status: 'РАБОТА',
        color: '#22c55e'
    },
    {
        title: 'ПРОИЗВОДСТВО',
        status: 'ПРЕДУПРЕЖДЕНИЕ',
        color: '#f97316'
    },
    {
    title: 'ПРОИЗВОДСТВО',
    status: 'КРИТИЧЕСКОЕ',
    color: '#ef4444'
}
];

let processStateIndex = 0;

function updateProcessStatus() {

    const state =
        processStates[
            processStateIndex
        ];

    processStatusContext.clearRect(
        0,
        0,
        512,
        180
    );

    processStatusContext.fillStyle =
        '#071018';

    processStatusContext.fillRect(
        0,
        0,
        512,
        180
    );

    processStatusContext.fillStyle =
        '#9ca3af';

    processStatusContext.font =
        'bold 26px Arial';

    processStatusContext.fillText(
        state.title,
        24,
        48
    );

    processStatusContext.fillStyle =
        state.color;

    processStatusContext.font =
        'bold 42px Arial';

    processStatusContext.fillText(
        state.status,
        24,
        105
    );

    processStatusTexture.needsUpdate =
        true;
}

updateProcessStatus();

setInterval(() => {

    let statusIndex = 1;

    if (
        currentTemperature >= 85 ||
        currentLoad >= 90 ||
        currentPressure >= 6.2
    ) {

        statusIndex = 3;

    } else if (
        currentTemperature >= 70 ||
        currentLoad >= 70 ||
        currentPressure >= 6.0
    ) {

        statusIndex = 2;

    } else {

        statusIndex = 1;
    }

    processStateIndex =
        statusIndex;

    updateProcessStatus();

}, 1000);

// =====================================================
// 12.39. СИГНАЛЬНАЯ ЛАМПА СОСТОЯНИЯ
// =====================================================

const statusBeaconMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x22c55e,
        emissive: 0x22c55e,
        emissiveIntensity: 1.5,
        metalness: 0.2,
        roughness: 0.25
    });

const statusBeacon =
    new THREE.Mesh(
        new THREE.SphereGeometry(
            0.16,
            20,
            20
        ),
        statusBeaconMaterial
    );

statusBeacon.position.set(
    4.2,
    3.25,
    -1.2
);

equipment.add(
    statusBeacon
);


// Основание лампы
const statusBeaconBase =
    new THREE.Mesh(
        new THREE.CylinderGeometry(
            0.2,
            0.2,
            0.12,
            20
        ),
        darkMetalMaterial
    );

statusBeaconBase.position.set(
    4.2,
    3.08,
    -1.2
);

equipment.add(
    statusBeaconBase
);


// Обновление цвета по состоянию производства
setInterval(() => {

    if (processStateIndex === 3) {

        statusBeaconMaterial.color.setHex(
            0xef4444
        );

        statusBeaconMaterial.emissive.setHex(
            0xef4444
        );

    } else if (
        processStateIndex === 2
    ) {

        statusBeaconMaterial.color.setHex(
            0xfacc15
        );

        statusBeaconMaterial.emissive.setHex(
            0xfacc15
        );

    } else {

        statusBeaconMaterial.color.setHex(
            0x22c55e
        );

        statusBeaconMaterial.emissive.setHex(
            0x22c55e
        );
    }

}, 500);
// =====================================================
// 12.44. ПУЛЬСИРУЮЩАЯ АВАРИЙНАЯ ЛАМПА
// =====================================================

let beaconPulse =
    0;

setInterval(() => {

    beaconPulse += 0.12;

    if (
        processStateIndex === 3
    ) {

        statusBeaconMaterial.emissiveIntensity =
            1.2 +
            Math.sin(beaconPulse) * 1.5;

        statusBeacon.scale.setScalar(
            1 +
            Math.sin(beaconPulse) * 0.12
        );

    } else {

        statusBeaconMaterial.emissiveIntensity =
            1.5;

        statusBeacon.scale.setScalar(
            1
        );
    }

}, 50);

// =====================================================
// 12.40. 3D-МАРКИРОВКА ОБОРУДОВАНИЯ
// =====================================================

function createEquipmentLabel(
    text,
    x,
    y,
    z
) {

    const canvas =
        document.createElement('canvas');

    canvas.width = 512;
    canvas.height = 128;

    const ctx =
        canvas.getContext('2d');

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    // Фон
    ctx.fillStyle =
        'rgba(7, 16, 24, 0.85)';

    ctx.fillRect(
        8,
        8,
        496,
        112
    );

    // Рамка
    ctx.strokeStyle =
        '#38bdf8';

    ctx.lineWidth = 4;

    ctx.strokeRect(
        8,
        8,
        496,
        112
    );

    // Текст
    ctx.fillStyle =
        '#ffffff';

    ctx.font =
        'bold 48px Arial';

    ctx.textAlign =
        'center';

    ctx.textBaseline =
        'middle';

    ctx.fillText(
        text,
        256,
        64
    );

    const texture =
        new THREE.CanvasTexture(
            canvas
        );

    texture.needsUpdate = true;

    const material =
        new THREE.SpriteMaterial({
            map: texture,
            transparent: true
        });

    const label =
        new THREE.Sprite(
            material
        );

    label.position.set(
        x,
        y,
        z
    );

    label.scale.set(
        1.8,
        0.45,
        1
    );

    equipment.add(label);

    return label;
}


// Основное оборудование
createEquipmentLabel(
    'M-101',
    -1.4,
    4.0,
    0
);


// Охлаждающий модуль
createEquipmentLabel(
    'C-204',
    2.2,
    3.5,
    1
);


// Давление / резервуар
createEquipmentLabel(
    'P-302',
    3.4,
    4.4,
    0
);

// =====================================================
// 12.41. МИНИ-КАРТА ОБЪЕКТА
// =====================================================

const minimap =
    document.createElement('div');

minimap.style.position = 'absolute';
minimap.style.right = '20px';
minimap.style.bottom = '20px';
minimap.style.width = '180px';
minimap.style.height = '180px';
minimap.style.background = 'rgba(5, 12, 18, 0.88)';
minimap.style.border = '1px solid rgba(56, 189, 248, 0.55)';
minimap.style.borderRadius = '12px';
minimap.style.overflow = 'hidden';
minimap.style.zIndex = '20';

sceneContainer.appendChild(
    minimap
);


const minimapCanvas =
    document.createElement('canvas');

minimapCanvas.width = 180;
minimapCanvas.height = 180;

minimap.appendChild(
    minimapCanvas
);

const minimapContext =
    minimapCanvas.getContext('2d');


function drawMinimap() {

    const ctx =
        minimapContext;

    ctx.clearRect(
        0,
        0,
        180,
        180
    );


    // Фон
    ctx.fillStyle =
        '#08131b';

    ctx.fillRect(
        0,
        0,
        180,
        180
    );


    // Сетка
    ctx.strokeStyle =
        'rgba(100, 150, 170, 0.15)';

    ctx.lineWidth = 1;

    for (let i = 20; i < 180; i += 20) {

        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 180);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(180, i);
        ctx.stroke();
    }


    // Платформа
    ctx.fillStyle =
        '#394752';

    ctx.fillRect(
        25,
        35,
        130,
        100
    );


    // M-101
    ctx.fillStyle =
        '#f59e0b';

    ctx.fillRect(
        72,
        72,
        36,
        36
    );


    // C-204
    ctx.fillStyle =
        '#22c7f0';

    ctx.beginPath();

    ctx.arc(
        125,
        75,
        14,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // P-302
    ctx.fillStyle =
        '#4ade80';

    ctx.fillRect(
        118,
        105,
        22,
        22
    );


    // Заголовок
    ctx.fillStyle =
        '#9ca3af';

    ctx.font =
        'bold 11px Arial';

    ctx.fillText(
        'ПЛАН ОБЪЕКТА',
        12,
        18
    );


    // Север
    ctx.fillStyle =
        '#ffffff';

    ctx.font =
        'bold 12px Arial';

    ctx.fillText(
        'N',
        166,
        18
    );
}


drawMinimap();
// =====================================================
// 12.42. ПОЗИЦИЯ КАМЕРЫ НА МИНИ-КАРТЕ
// =====================================================

const cameraMarker =
    document.createElement('div');

cameraMarker.style.position = 'absolute';
cameraMarker.style.width = '10px';
cameraMarker.style.height = '10px';
cameraMarker.style.background = '#38bdf8';
cameraMarker.style.border = '2px solid white';
cameraMarker.style.borderRadius = '50%';
cameraMarker.style.transform = 'translate(-50%, -50%)';
cameraMarker.style.pointerEvents = 'none';
cameraMarker.style.boxShadow =
    '0 0 10px rgba(56, 189, 248, 0.9)';
cameraMarker.style.clipPath =
    'polygon(50% 0%, 100% 100%, 50% 75%, 0% 100%)';

cameraMarker.style.borderRadius =
    '0';

cameraMarker.style.background =
    '#38bdf8';

minimap.appendChild(
    cameraMarker
);


function updateCameraMarker() {

    const mapX =
        90 + camera.position.x * 8;

    const mapY =
        90 + camera.position.z * 8;

    cameraMarker.style.left =
        `${Math.max(8, Math.min(172, mapX))}px`;

    cameraMarker.style.top =
        `${Math.max(8, Math.min(172, mapY))}px`;


    // Направление взгляда камеры
    const direction =
        new THREE.Vector3();

    direction
        .copy(controls.target)
        .sub(camera.position)
        .normalize();

    const angle =
        Math.atan2(
            direction.x,
            direction.z
        );

    cameraMarker.style.transform =
        `translate(-50%, -50%) rotate(${angle}rad)`;
}
// =====================================================
// 13. DRILL-DOWN
// =====================================================

const drillBase =
    createBox(
        5,
        0.6,
        4,
        darkMetalMaterial
    );

drillBase.position.y =
    0.3;

drillDownGroup.add(
    drillBase
);


const core =
    createCylinder(
        1.1,
        2.6,
        blueMaterial
    );

core.position.y =
    1.8;

drillDownGroup.add(
    core
);


const coreTop =
    createBox(
        2,
        0.35,
        2,
        whiteMaterial
    );

coreTop.position.y =
    3.15;

drillDownGroup.add(
    coreTop
);


const innerTop =
    createBox(
        1.3,
        1,
        1.3,
        metalMaterial
    );

innerTop.position.set(
    0,
    4,
    0
);

drillDownGroup.add(
    innerTop
);


const pump =
    createCylinder(
        0.55,
        1.8,
        warningMaterial
    );

pump.position.set(
    -2,
    1.2,
    0
);

drillDownGroup.add(
    pump
);


const sideModule =
    createBox(
        1.2,
        1.5,
        1.2,
        darkMetalMaterial
    );

sideModule.position.set(
    2,
    1.1,
    0
);

drillDownGroup.add(
    sideModule
);


core.userData = {
    name: 'Центральный процессорный модуль',
    status: 'Работает',
    temperature: 68,
    efficiency: 97.1,
    type: 'Процессорный модуль'
};

innerTop.userData = {
    name: 'Модуль управления',
    status: 'Работает',
    temperature: 31,
    efficiency: 99.2,
    type: 'Система управления'
};

pump.userData = {
    name: 'Гидравлический насос',
    status: 'Работает',
    temperature: 46,
    efficiency: 93.5,
    type: 'Насосная система'
};

sideModule.userData = {
    name: 'Силовой модуль',
    status: 'Работает',
    temperature: 39,
    efficiency: 96.4,
    type: 'Энергетическая система'
};


// =====================================================
// 14. ВЫБРАННОЕ ОБОРУДОВАНИЕ
// =====================================================

let selectedData =
    mainMachine.userData;

let currentTemperature =
    Number(
        selectedData.temperature
    );

let currentLoad =
    Number(
        selectedData.efficiency
    );
    let currentPressure = 5.4;


// =====================================================
// 15. ИНФОРМАЦИОННАЯ КАРТОЧКА
// =====================================================

const infoCard =
    document.createElement('div');

infoCard.style.position =
    'absolute';

infoCard.style.right =
    '20px';

infoCard.style.top =
    '20px';

infoCard.style.width =
    '260px';

infoCard.style.padding =
    '18px';

infoCard.style.background =
    'rgba(10,18,27,0.94)';

infoCard.style.border =
    '1px solid rgba(255,255,255,0.12)';

infoCard.style.borderRadius =
    '12px';

infoCard.style.color =
    '#ffffff';

infoCard.style.fontFamily =
    'Arial, sans-serif';

infoCard.style.zIndex =
    '10';

infoCard.style.display =
    'none';

sceneContainer.appendChild(
    infoCard
);
// =====================================================
// КНОПКА НАЗАД ДЛЯ DRILL-DOWN
// =====================================================

const drillBackButton =
    document.createElement('button');

drillBackButton.textContent =
    '← Назад';

drillBackButton.style.position =
    'absolute';

drillBackButton.style.left =
    '20px';

drillBackButton.style.top =
    '20px';

drillBackButton.style.padding =
    '10px 16px';

drillBackButton.style.background =
    'rgba(10,18,27,0.94)';

drillBackButton.style.color =
    '#ffffff';

drillBackButton.style.border =
    '1px solid rgba(56,189,248,0.7)';

drillBackButton.style.borderRadius =
    '8px';

drillBackButton.style.fontSize =
    '14px';

drillBackButton.style.fontWeight =
    '600';

drillBackButton.style.cursor =
    'pointer';

drillBackButton.style.zIndex =
    '30';

drillBackButton.style.display =
    'none';

sceneContainer.appendChild(
    drillBackButton
);


function showInfo(data) {

    const pressure =
        data.pressure
            ? `
                <div style="
                    margin-top:10px;
                    color:#718090;
                    font-size:10px;
                ">
                    ДАВЛЕНИЕ
                    <strong style="
                        display:block;
                        margin-top:4px;
                        color:#fff;
                        font-size:14px;
                    ">
                        ${data.pressure} МПа
                    </strong>
                </div>
            `
            : '';


    infoCard.innerHTML = `

        <div style="
            color:#55aef5;
            font-size:9px;
            letter-spacing:1.4px;
            margin-bottom:7px;
        ">
            ВЫБРАННОЕ ОБОРУДОВАНИЕ
        </div>

        <div style="
            font-size:17px;
            font-weight:600;
            margin-bottom:7px;
        ">
            ${data.name}
        </div>

        <div style="
            color:#62df91;
            font-size:10px;
            margin-bottom:18px;
        ">
            ● ${data.status}
        </div>

        <div style="
            display:flex;
            justify-content:space-between;
            border-top:1px solid rgba(255,255,255,0.08);
            padding-top:12px;
        ">

            <div>
                <div style="
                    color:#718090;
                    font-size:9px;
                ">
                    ТЕМПЕРАТУРА
                </div>

                <strong
                    id="selected-temperature"
                    style="
                        display:block;
                        margin-top:4px;
                        font-size:16px;
                    "
                >
                    ${Math.round(currentTemperature)} °C
                </strong>
            </div>


            <div>
                <div style="
                    color:#718090;
                    font-size:9px;
                ">
                    ЭФФЕКТИВНОСТЬ
                </div>

                <strong
                    id="selected-efficiency"
                    style="
                        display:block;
                        margin-top:4px;
                        font-size:16px;
                    "
                >
                    ${currentLoad.toFixed(1)}%
                </strong>
            </div>

        </div>

        ${pressure}

        <div style="
            margin-top:14px;
            color:#687787;
            font-size:9px;
        ">
            ${data.type}
        </div>
    `;

    infoCard.style.display =
        'block';
}


// =====================================================
// 16. RAYCASTER
// =====================================================

const raycaster =
    new THREE.Raycaster();

const mouse =
    new THREE.Vector2();

let hoveredObject =
    null;


function getIntersects(
    event
) {

    const rect =
        renderer.domElement.getBoundingClientRect();


    mouse.x =
        (
            (event.clientX - rect.left) /
            rect.width
        ) * 2 - 1;


    mouse.y =
        -(
            (event.clientY - rect.top) /
            rect.height
        ) * 2 + 1;


    raycaster.setFromCamera(
        mouse,
        camera
    );


    const group =
        drillDownGroup.visible
            ? drillDownGroup
            : equipment;


    return raycaster.intersectObjects(
        group.children,
        true
    );
}


// =====================================================
// 17. НАЖАТИЕ НА ОБОРУДОВАНИЕ
// =====================================================

renderer.domElement.addEventListener(
    'click',
    (event) => {

        const intersects =
            getIntersects(event);


        if (
            intersects.length === 0
        ) {
            return;
        }


        let object =
            intersects[0].object;


        while (
            object.parent &&
            !object.userData.name
        ) {

            object =
                object.parent;
        }


        if (
            !object.userData.name
        ) {
            return;
        }


        selectedData =
            object.userData;


currentTemperature =
    Number(
        selectedData.temperature
    );

        currentTemperature =
            Number(
                selectedData.temperature
            );


        currentLoad =
            Number(
                selectedData.efficiency
            );


        showInfo(
            selectedData
        );


        updateMonitoring();
    }
);



// =====================================================
// 18. МНОГОУРОВНЕВЫЙ DRILL-DOWN
// =====================================================

let deepDrillGroup = null;
let drillDownLevel = 0;


// =====================================================
// СОЗДАНИЕ ГЛУБОКОГО УРОВНЯ
// =====================================================

function createDeepDrillGroup(type) {

    const group = new THREE.Group();

    const metal =
        new THREE.MeshStandardMaterial({
            color: 0x56636b,
            metalness: 0.85,
            roughness: 0.25
        });

    const dark =
        new THREE.MeshStandardMaterial({
            color: 0x202a30,
            metalness: 0.8,
            roughness: 0.3
        });

    const blue =
        new THREE.MeshStandardMaterial({
            color: 0x1976a8,
            metalness: 0.65,
            roughness: 0.25
        });

    const copper =
        new THREE.MeshStandardMaterial({
            color: 0xb87333,
            metalness: 0.9,
            roughness: 0.2
        });

    const yellow =
        new THREE.MeshStandardMaterial({
            color: 0xd6a928,
            metalness: 0.7,
            roughness: 0.3
        });

    // -------------------------------------------------
    // ОБЩЕЕ ОСНОВАНИЕ
    // -------------------------------------------------

    const base =
        createBox(
            5.5,
            0.45,
            4.2,
            dark
        );

    base.position.y = 0.25;
    group.add(base);


    // =================================================
    // 1. ПРОЦЕССОРНЫЙ МОДУЛЬ
    // =================================================

    if (type === 'Процессорный модуль') {

        const processor =
            createBox(
                2.4,
                1.5,
                2.0,
                blue
            );

        processor.position.set(
            0,
            1.25,
            0
        );

        group.add(processor);


        // Радиатор

        for (let i = 0; i < 6; i++) {

            const fin =
                createBox(
                    0.12,
                    0.8,
                    1.5,
                    metal
                );

            fin.position.set(
                -0.65 + i * 0.26,
                2.35,
                0
            );

            group.add(fin);
        }


        // Центральная плата

        const board =
            createBox(
                1.6,
                0.08,
                1.1,
                dark
            );

        board.position.set(
            0,
            2.75,
            0
        );

        group.add(board);


        // Разъёмы

        for (let i = 0; i < 5; i++) {

            const connector =
                createBox(
                    0.18,
                    0.22,
                    0.35,
                    yellow
                );

            connector.position.set(
                -0.7 + i * 0.35,
                2.92,
                0
            );

            group.add(connector);
        }


        createEquipmentLabel(
            'ПРОЦЕССОРНЫЙ МОДУЛЬ',
            1.3,
            4.1,
            0
        );
    }


    // =================================================
    // 2. СИСТЕМА УПРАВЛЕНИЯ
    // =================================================

    else if (type === 'Система управления') {

        const controller =
            createBox(
                2.6,
                2.2,
                1.8,
                dark
            );

        controller.position.set(
            0,
            1.5,
            0
        );

        group.add(controller);


        // Панель

        const panel =
            createBox(
                1.8,
                1.0,
                0.08,
                blue
            );

        panel.position.set(
            0,
            1.7,
            -0.94
        );

        group.add(panel);


        // Индикаторы

        const colors = [
            0x22c55e,
            0xfacc15,
            0xef4444
        ];

        colors.forEach(
            (color, index) => {

                const indicatorMaterial =
                    new THREE.MeshStandardMaterial({
                        color: color,
                        emissive: color,
                        emissiveIntensity: 1.5
                    });

                const indicator =
                    new THREE.Mesh(
                        new THREE.SphereGeometry(
                            0.12,
                            16,
                            16
                        ),
                        indicatorMaterial
                    );

                indicator.position.set(
                    -0.55 + index * 0.55,
                    2.05,
                    -1.0
                );

                group.add(indicator);
            }
        );


        // Реле

        for (let i = 0; i < 4; i++) {

            const relay =
                createBox(
                    0.3,
                    0.45,
                    0.3,
                    yellow
                );

            relay.position.set(
                -0.6 + i * 0.4,
                0.55,
                0
            );

            group.add(relay);
        }


        createEquipmentLabel(
            'СИСТЕМА УПРАВЛЕНИЯ',
            0,
            3.0,
            0
        );
    }


    // =================================================
    // 3. НАСОС
    // =================================================

    else if (
        type === 'Насос' ||
        type === 'Насосная система'
    ) {

        const motor =
            createCylinder(
                0.8,
                1.8,
                blue
            );

        motor.rotation.z =
            Math.PI / 2;

        motor.position.set(
            0,
            1.35,
            0
        );

        group.add(motor);


        // Вал

        const shaft =
            createCylinder(
                0.16,
                2.5,
                copper
            );

        shaft.rotation.z =
            Math.PI / 2;

        shaft.position.set(
            1.0,
            1.35,
            0
        );

        group.add(shaft);


        // Корпус насоса

        const pumpBody =
            createCylinder(
                1.0,
                0.7,
                metal
            );

        pumpBody.rotation.z =
            Math.PI / 2;

        pumpBody.position.set(
            -1.35,
            1.35,
            0
        );

        group.add(pumpBody);


        // Крыльчатка

        for (let i = 0; i < 6; i++) {

            const blade =
                createBox(
                    0.12,
                    0.65,
                    0.12,
                    yellow
                );

            blade.position.set(
                -1.35,
                1.35 +
                Math.cos(
                    i * Math.PI / 3
                ) * 0.4,
                Math.sin(
                    i * Math.PI / 3
                ) * 0.4
            );

            blade.rotation.x =
                i * Math.PI / 3;

            group.add(blade);
        }


        createEquipmentLabel(
            'ГИДРАВЛИЧЕСКИЙ НАСОС',
            0,
            3.2,
            0
        );
    }


    // =================================================
    // 4. СИЛОВОЙ МОДУЛЬ
    // =================================================

    else if (
        type === 'Фильтрационный модуль' ||
        type === 'Энергетическая система'
    ) {

        const powerUnit =
            createBox(
                2.2,
                2.4,
                1.8,
                dark
            );

        powerUnit.position.set(
            0,
            1.5,
            0
        );

        group.add(powerUnit);


        // Силовые элементы

        for (let i = 0; i < 4; i++) {

            const powerCell =
                createBox(
                    0.3,
                    1.2,
                    0.5,
                    blue
                );

            powerCell.position.set(
                -0.6 + i * 0.4,
                1.5,
                -0.95
            );

            group.add(powerCell);
        }


        // Медные шины

        for (let i = 0; i < 3; i++) {

            const bus =
                createBox(
                    0.12,
                    1.6,
                    0.12,
                    copper
                );

            bus.position.set(
                -0.45 + i * 0.45,
                1.5,
                0.95
            );

            group.add(bus);
        }


        createEquipmentLabel(
            'СИЛОВОЙ МОДУЛЬ',
            0,
            3.2,
            0
        );
    }


    // =================================================
    // ОБЩИЙ ИНФОРМАЦИОННЫЙ ЗАГОЛОВОК
    // =================================================

    // Общий заголовок не добавляем,
// чтобы подписи компонентов не пересекались.

// =====================================================
// АНИМАЦИЯ ВНУТРЕННИХ КОМПОНЕНТОВ
// =====================================================

group.userData.animationType = type;

return group;
}


// =====================================================
// ДВОЙНОЙ КЛИК
// =====================================================

renderer.domElement.addEventListener(
    'dblclick',
    (event) => {

        const intersects =
            getIntersects(event);

        if (
            intersects.length === 0
        ) {
            return;
        }


        // =============================================
        // УРОВЕНЬ 0 → УРОВЕНЬ 1
        // =============================================

        if (drillDownLevel === 0) {

            let object =
                intersects[0].object;

            while (
                object &&
                !object.userData.name
            ) {
                object = object.parent;
            }

            if (!object) {
                return;
            }

            if (
                object !== mainMachine
            ) {
                return;
            }


            equipment.visible = false;

            drillDownGroup.visible = true;

            drillDownLevel = 1;

            drillBackButton.style.display =
                'block';

            selectedData =
                core.userData;

            currentTemperature =
                Number(
                    selectedData.temperature
                );

            currentLoad =
                Number(
                    selectedData.efficiency
                );

            showInfo(selectedData);

            updateMonitoring();

            return;
        }


        // =============================================
        // УРОВЕНЬ 1 → УРОВЕНЬ 2
        // =============================================

        if (drillDownLevel === 1) {

            let object =
                intersects[0].object;

            while (
                object &&
                !object.userData.type
            ) {
                object = object.parent;
            }

            if (!object) {
                return;
            }


            const type =
                object.userData.type;

            if (!type) {
                return;
            }


            if (deepDrillGroup) {

                scene.remove(
                    deepDrillGroup
                );
            }


            deepDrillGroup =
                createDeepDrillGroup(
                    type
                );

            scene.add(
                deepDrillGroup
            );


            drillDownGroup.visible =
                false;

            deepDrillGroup.visible =
                true;

            drillDownLevel = 2;

            selectedData =
                object.userData;

            currentTemperature =
                Number(
                    selectedData.temperature
                );

            currentLoad =
                Number(
                    selectedData.efficiency
                );

            showInfo(selectedData);

            updateMonitoring();

            return;
        }
    }
);


// =====================================================
// КНОПКА НАЗАД
// =====================================================

drillBackButton.addEventListener(
    'click',
    () => {

        // =============================================
        // УРОВЕНЬ 2 → УРОВЕНЬ 1
        // =============================================

        if (
            drillDownLevel === 2
        ) {

            if (deepDrillGroup) {

                scene.remove(
                    deepDrillGroup
                );

                deepDrillGroup = null;
            }

            deepDrillGroup = null;

            drillDownGroup.visible =
                true;

            drillDownLevel = 1;

            selectedData =
                core.userData;

            currentTemperature =
                Number(
                    selectedData.temperature
                );

            currentLoad =
                Number(
                    selectedData.efficiency
                );

            showInfo(selectedData);

            updateMonitoring();

            return;
        }


        // =============================================
        // УРОВЕНЬ 1 → ОСНОВНОЙ
        // =============================================

        if (
            drillDownLevel === 1
        ) {

            drillDownGroup.visible =
                false;

            equipment.visible =
                true;

            drillDownLevel = 0;

            drillBackButton.style.display =
                'none';

            selectedData =
                mainMachine.userData;

            currentTemperature =
                Number(
                    selectedData.temperature
                );

            currentLoad =
                Number(
                    selectedData.efficiency
                );

            showInfo(selectedData);

            updateMonitoring();
        }
    }
);

// =====================================================
// 19. НАВЕДЕНИЕ
// =====================================================

renderer.domElement.addEventListener(
    'mousemove',
    (event) => {

        const intersects =
            getIntersects(event);


        if (
            intersects.length > 0
        ) {

            renderer.domElement.style.cursor =
                'pointer';

            hoveredObject =
                intersects[0].object;

        } else {

            renderer.domElement.style.cursor =
                'grab';

            hoveredObject =
                null;
        }
    }
);


// =====================================================
// 20. СБРОС ВИДА
// =====================================================

const resetButton =
    document.getElementById(
        'reset-view'
    );


if (resetButton) {

    resetButton.addEventListener(
        'click',
        () => {

            equipment.visible =
                true;

            drillDownGroup.visible =
                false;


            selectedData =
                mainMachine.userData;


            currentTemperature =
                Number(
                    selectedData.temperature
                );


            currentLoad =
                Number(
                    selectedData.efficiency
                );


            infoCard.style.display =
                'none';


            controls.target.set(
                0,
                2,
                0
            );


            camera.position.set(
                10,
                7,
                12
            );

            controls.update();


            updateMonitoring();
        }
    );
}


// =====================================================
// 21. МОНИТОРИНГ
// =====================================================

const temperatureElement =
    document.getElementById(
        'temperature-value'
    );


const loadElement =
    document.getElementById(
        'load-value'
    );


const loadProgress =
    document.getElementById(
        'load-progress'
    );


const chartCurrentTemperature =
    document.getElementById(
        'chart-current-temperature'
    );


const productionLoad =
    document.getElementById(
        'production-load'
    );


function updateMonitoring() {

    const baseTemperature =
        Number(
            selectedData.temperature
        );


    const baseLoad =
        Number(
            selectedData.efficiency
        );


    currentTemperature +=
        (Math.random() - 0.5) * 2.5;


    currentTemperature =
        Math.max(
            baseTemperature - 7,
            Math.min(
                baseTemperature + 7,
                currentTemperature
            )
        );


    currentLoad +=
        (Math.random() - 0.5) * 2;


    currentLoad =
        Math.max(
            baseLoad - 8,
            Math.min(
                baseLoad + 8,
                currentLoad
            )
        );
        updateLoadState();
        // Динамическое давление
currentPressure +=
    (Math.random() - 0.5) * 0.12;

currentPressure =
    Math.max(
        4.8,
        Math.min(
            6.2,
            currentPressure
        )
    );
    // =====================================================
// Состояние горячего узла по температуре
// =====================================================

let heatColor;

if (currentTemperature < 70) {

    heatColor = 0x22c55e;

} else if (currentTemperature < 85) {

    heatColor = 0xfacc15;

} else {

    heatColor = 0xef4444;
}

heatMaterial.color.setHex(
    heatColor
);

heatMaterial.emissive.setHex(
    heatColor
);
        // Обновление 3D-дисплеев
if (temperatureDisplay) {

    const oldTexture =
        temperatureDisplay.material.map;

    temperatureDisplay.material.map =
        createMetricTexture(
            'TEMP',
            `${Math.round(currentTemperature)} °C`
        );

    temperatureDisplay.material.needsUpdate = true;

    if (oldTexture) {
        oldTexture.dispose();
    }
}


if (loadDisplay) {

    const oldTexture =
        loadDisplay.material.map;

    loadDisplay.material.map =
        createMetricTexture(
            'LOAD',
            `${Math.round(currentLoad)} %`
        );
        if (pressureDisplay) {

    const oldTexture =
        pressureDisplay.material.map;

    pressureDisplay.material.map =
        createMetricTexture(
            'PRESSURE',
            '${currentPressure.toFixed(1)} BAR'
        );

    pressureDisplay.material.needsUpdate =
        true;

    if (oldTexture) {
        oldTexture.dispose();
    }
}

    loadDisplay.material.needsUpdate = true;

    if (oldTexture) {
        oldTexture.dispose();
    }
}


    if (
        temperatureElement
    ) {

        temperatureElement.textContent =
            Math.round(
                currentTemperature
            );
    }


    if (
        chartCurrentTemperature
    ) {

        chartCurrentTemperature.textContent =
            Math.round(
                currentTemperature
            );
    }


    if (
        loadElement
    ) {

        loadElement.textContent =
            currentLoad.toFixed(1) + '%';
    }


    if (
        productionLoad
    ) {

        productionLoad.textContent =
            currentLoad.toFixed(1) + '%';
    }


    if (
        loadProgress
    ) {

        loadProgress.style.width =
            Math.min(
                currentLoad,
                100
            ) + '%';
    }


    const selectedTemperature =
        document.getElementById(
            'selected-temperature'
        );


    if (
        selectedTemperature
    ) {

        selectedTemperature.textContent =
            Math.round(
                currentTemperature
            ) + ' °C';
    }


    const selectedEfficiency =
        document.getElementById(
            'selected-efficiency'
        );


    if (
        selectedEfficiency
    ) {

        selectedEfficiency.textContent =
            currentLoad.toFixed(1) + '%';
    }
    // =====================================================
// ОБНОВЛЕНИЕ РАЗДЕЛА «ДАТЧИКИ»
// =====================================================

function updateSensorDashboard() {

    const temperatureElement =
        document.getElementById(
            'sensor-temperature'
        );

    const pressureElement =
        document.getElementById(
            'sensor-pressure'
        );

    const loadElement =
        document.getElementById(
            'sensor-load'
        );

    const vibrationElement =
        document.getElementById(
            'sensor-vibration'
        );


    // Если раздел ещё не загружен,
    // просто ничего не делаем.

    if (
        !temperatureElement ||
        !pressureElement ||
        !loadElement ||
        !vibrationElement
    ) {
        return;
    }


    // =================================================
    // ЗНАЧЕНИЯ
    // =================================================

    temperatureElement.textContent =
        Math.round(currentTemperature);

    pressureElement.textContent =
        currentPressure.toFixed(1);

    loadElement.textContent =
        Math.round(currentLoad);

    
    // Вибрация пока рассчитывается
    // на основе нагрузки.

    const vibration =
        1.4 +
        currentLoad * 0.011 +
        Math.sin(
            performance.now() * 0.001
        ) * 0.25;

    vibrationElement.textContent =
        vibration.toFixed(1);


    // =================================================
    // ПОЛОСЫ
    // =================================================

    const temperatureBar =
        document.getElementById(
            'temperature-bar'
        );

    const pressureBar =
        document.getElementById(
            'pressure-bar'
        );

    const loadBar =
        document.getElementById(
            'load-bar'
        );

    const vibrationBar =
        document.getElementById(
            'vibration-bar'
        );


    if (temperatureBar) {

        const temperaturePercent =
            Math.min(
                100,
                Math.max(
                    0,
                    currentTemperature
                )
            );

        temperatureBar.style.width =
            `${temperaturePercent}%`;
    }


    if (pressureBar) {

        const pressurePercent =
            Math.min(
                100,
                Math.max(
                    0,
                    (currentPressure / 7) * 100
                )
            );

        pressureBar.style.width =
            `${pressurePercent}%`;
    }


    if (loadBar) {

        loadBar.style.width =
            `${Math.min(
                100,
                Math.max(
                    0,
                    currentLoad
                )
            )}%`;
    }


    if (vibrationBar) {

        const vibrationPercent =
            Math.min(
                100,
                (vibration / 5) * 100
            );

        vibrationBar.style.width =
            `${vibrationPercent}%`;
    }


    // =================================================
    // СОСТОЯНИЯ
    // =================================================

    updateSensorCardState(
        'temperature-state',
        currentTemperature,
        70,
        85
    );

    updateSensorCardState(
        'pressure-state',
        currentPressure,
        6.0,
        6.2
    );

    updateSensorCardState(
        'load-state',
        currentLoad,
        70,
        90
    );

    updateSensorCardState(
        'vibration-state',
        vibration,
        3.5,
        4.5
    );
}


// =====================================================
// СОСТОЯНИЕ КАРТОЧКИ
// =====================================================

function updateSensorCardState(
    elementId,
    value,
    warningLevel,
    criticalLevel
) {

    const element =
        document.getElementById(
            elementId
        );

    if (!element) {
        return;
    }


    if (value >= criticalLevel) {

        element.textContent =
            'КРИТИЧЕСКОЕ';

        element.style.color =
            '#ef4444';

        element.style.background =
            'rgba(239, 68, 68, 0.12)';

        element.style.borderColor =
            'rgba(239, 68, 68, 0.35)';

    }

    else if (value >= warningLevel) {

        element.textContent =
            'ПРЕДУПРЕЖДЕНИЕ';

        element.style.color =
            '#facc15';

        element.style.background =
            'rgba(250, 204, 21, 0.12)';

        element.style.borderColor =
            'rgba(250, 204, 21, 0.35)';

    }

    else {

        element.textContent =
            'НОРМА';

        element.style.color =
            '#22c55e';

        element.style.background =
            'rgba(34, 197, 94, 0.12)';

        element.style.borderColor =
            'rgba(34, 197, 94, 0.3)';
    }
}
updateSensorDashboard();
}


setInterval(
    updateMonitoring,
    1000
);


// =====================================================
// 22. ГРАФИК ТЕМПЕРАТУРЫ
// =====================================================

const temperatureCanvas =
    document.getElementById(
        'temperature-chart'
    );


const temperatureContext =
    temperatureCanvas
        ? temperatureCanvas.getContext('2d')
        : null;


const temperatureHistory =
    [];


for (
    let i = 0;
    i < 30;
    i++
) {

    temperatureHistory.push(
        currentTemperature
    );
}


function resizeCanvas(
    canvas
) {

    if (!canvas) {
        return;
    }


    const rect =
        canvas.getBoundingClientRect();


    const ratio =
        window.devicePixelRatio || 1;


    canvas.width =
        rect.width * ratio;


    canvas.height =
        rect.height * ratio;


    const context =
        canvas.getContext('2d');


    context.setTransform(
        ratio,
        0,
        0,
        ratio,
        0,
        0
    );
}


function drawTemperatureChart() {

    if (
        !temperatureCanvas ||
        !temperatureContext
    ) {
        return;
    }


    const width =
        temperatureCanvas.clientWidth;

    const height =
        temperatureCanvas.clientHeight;


    temperatureContext.clearRect(
        0,
        0,
        width,
        height
    );


    const min =
        Math.min(
            ...temperatureHistory
        ) - 3;


    const max =
        Math.max(
            ...temperatureHistory
        ) + 3;


    // Сетка

    temperatureContext.strokeStyle =
        'rgba(255,255,255,0.06)';

    temperatureContext.lineWidth =
        1;


    for (
        let i = 1;
        i < 5;
        i++
    ) {

        const y =
            (height / 5) * i;


        temperatureContext.beginPath();

        temperatureContext.moveTo(
            0,
            y
        );

        temperatureContext.lineTo(
            width,
            y
        );

        temperatureContext.stroke();
    }


    // Линия

    temperatureContext.beginPath();


    temperatureHistory.forEach(
        (value, index) => {

            const x =
                (
                    index /
                    (
                        temperatureHistory.length - 1
                    )
                ) * width;


            const y =
                height -
                (
                    (
                        value - min
                    ) /
                    (
                        max - min
                    )
                ) * height;


            if (
                index === 0
            ) {

                temperatureContext.moveTo(
                    x,
                    y
                );

            } else {

                temperatureContext.lineTo(
                    x,
                    y
                );
            }
        }
    );


    temperatureContext.strokeStyle =
        '#4fa5ff';

    temperatureContext.lineWidth =
        2.5;

    temperatureContext.stroke();


    // Последняя точка

    const last =
        temperatureHistory[
            temperatureHistory.length - 1
        ];


    const lastY =
        height -
        (
            (
                last - min
            ) /
            (
                max - min
            )
        ) * height;


    temperatureContext.beginPath();

    temperatureContext.arc(
        width,
        lastY,
        4,
        0,
        Math.PI * 2
    );

    temperatureContext.fillStyle =
        '#62df91';

    temperatureContext.fill();
}


// =====================================================
// 23. ГРАФИК АНАЛИТИКИ
// =====================================================

const analyticsCanvas =
    document.getElementById(
        'analytics-chart'
    );


const analyticsContext =
    analyticsCanvas
        ? analyticsCanvas.getContext('2d')
        : null;


function drawAnalyticsChart() {

    if (
        !analyticsCanvas ||
        !analyticsContext
    ) {
        return;
    }


    const width =
        analyticsCanvas.clientWidth;

    const height =
        analyticsCanvas.clientHeight;


    analyticsContext.clearRect(
        0,
        0,
        width,
        height
    );


    const min =
        Math.min(
            ...temperatureHistory
        ) - 3;


    const max =
        Math.max(
            ...temperatureHistory
        ) + 3;


    analyticsContext.strokeStyle =
        'rgba(255,255,255,0.06)';

    analyticsContext.lineWidth =
        1;


    for (
        let i = 1;
        i < 6;
        i++
    ) {

        const y =
            (height / 6) * i;


        analyticsContext.beginPath();

        analyticsContext.moveTo(
            0,
            y
        );

        analyticsContext.lineTo(
            width,
            y
        );

        analyticsContext.stroke();
    }


    analyticsContext.beginPath();


    temperatureHistory.forEach(
        (value, index) => {

            const x =
                (
                    index /
                    (
                        temperatureHistory.length - 1
                    )
                ) * width;


            const y =
                height -
                (
                    (
                        value - min
                    ) /
                    (
                        max - min
                    )
                ) * height;


            if (
                index === 0
            ) {

                analyticsContext.moveTo(
                    x,
                    y
                );

            } else {

                analyticsContext.lineTo(
                    x,
                    y
                );
            }
        }
    );


    analyticsContext.strokeStyle =
        '#4fa5ff';

    analyticsContext.lineWidth =
        3;

    analyticsContext.stroke();
}


// =====================================================
// 24. ИСТОРИЯ ТЕМПЕРАТУРЫ
// =====================================================

setInterval(
    () => {

        temperatureHistory.push(
            currentTemperature
        );


        if (
            temperatureHistory.length > 30
        ) {

            temperatureHistory.shift();
        }


        drawTemperatureChart();

        drawAnalyticsChart();

    },
    1000
);


// =====================================================
// 25. НАВИГАЦИЯ
// =====================================================

const navigationItems =
    document.querySelectorAll(
        '.nav-item'
    );


const contentSections =
    document.querySelectorAll(
        '.content-section'
    );


const pageTitle =
    document.getElementById(
        'page-title'
    );


const sectionTitles = {

    overview:
        'Обзор производства',

    equipment:
        'Мониторинг оборудования',

    sensors:
        'Сеть датчиков',

    production:
        'Производственные показатели',

    analytics:
        'Аналитика производства'
};


navigationItems.forEach(
    (item) => {

        item.addEventListener(
            'click',
            () => {

                const section =
                    item.dataset.section;


                // Активная кнопка

                navigationItems.forEach(
                    (button) => {

                        button.classList.remove(
                            'active'
                        );

                    }
                );


                item.classList.add(
                    'active'
                );


                // Переключаем содержимое

                contentSections.forEach(
                    (content) => {

                        content.classList.remove(
                            'active'
                        );

                    }
                );


                const selectedSection =
                    document.getElementById(
                        'section-' + section
                    );


                if (
                    selectedSection
                ) {

                    selectedSection.classList.add(
                        'active'
                    );

                }


                // Меняем заголовок

                if (
                    pageTitle &&
                    sectionTitles[section]
                ) {

                    pageTitle.textContent =
                        sectionTitles[section];

                }


                // Обновляем Canvas
                // после открытия аналитики

                if (
                    section === 'overview'
                ) {

                    setTimeout(
                        () => {

                            resizeCanvas(
                                temperatureCanvas
                            );

                            drawTemperatureChart();

                        },
                        50
                    );

                }


                if (
                    section === 'analytics'
                ) {

                    setTimeout(
                        () => {

                            resizeCanvas(
                                analyticsCanvas
                            );

                            drawAnalyticsChart();

                        },
                        50
                    );

                }

            }
        );

    }
);


// =====================================================
// 26. ИЗМЕНЕНИЕ РАЗМЕРА ОКНА
// =====================================================

function resizeScene() {

    if (
        !sceneContainer
    ) {
        return;
    }


    const width =
        sceneContainer.clientWidth;

    const height =
        sceneContainer.clientHeight;


    camera.aspect =
        width / height;

    camera.updateProjectionMatrix();


    renderer.setSize(
        width,
        height
    );


    resizeCanvas(
        temperatureCanvas
    );

    resizeCanvas(
        analyticsCanvas
    );


    drawTemperatureChart();

    drawAnalyticsChart();
}


window.addEventListener(
    'resize',
    resizeScene
);


// =====================================================
// 27. ПЕРВОНАЧАЛЬНАЯ НАСТРОЙКА
// =====================================================

resizeScene();

updateMonitoring();


// Скрываем загрузку

setTimeout(
    () => {

        if (
            loadingScreen
        ) {

            loadingScreen.style.display =
                'none';

        }

    },
    500
);


// =====================================================
// 28. АНИМАЦИЯ
// =====================================================

function animate() {

    requestAnimationFrame(animate);

    controls.update();


    // =================================================
    // АНИМАЦИЯ ВНУТРЕННЕГО DRILL-DOWN
    // =================================================

    if (
        deepDrillGroup &&
        deepDrillGroup.visible
    ) {

        const time =
            performance.now() * 0.001;

        const type =
            deepDrillGroup.userData.animationType;


        // ПРОЦЕССОРНЫЙ МОДУЛЬ

        if (
            type === 'Процессорный модуль'
        ) {

            deepDrillGroup.rotation.y =
                Math.sin(time * 0.35) * 0.025;
        }


        // СИСТЕМА УПРАВЛЕНИЯ

        else if (
            type === 'Система управления'
        ) {

            deepDrillGroup.position.y =
                Math.sin(time * 1.5) * 0.015;
        }


        // НАСОС

        else if (
            type === 'Насос' ||
            type === 'Насосная система'
        ) {

            deepDrillGroup.rotation.y =
                time * 0.35;
        }


        // СИЛОВОЙ МОДУЛЬ

        else if (
            type === 'Фильтрационный модуль' ||
            type === 'Энергетическая система'
        ) {

            deepDrillGroup.rotation.y =
                Math.sin(time * 0.5) * 0.035;
        }
    }


    // =================================================
    // СУЩЕСТВУЮЩИЕ АНИМАЦИИ
    // =================================================

    mainIndicator.rotation.y += 0.02;

    tankIndicator.rotation.y += 0.02;

    pressureIndicator.rotation.y += 0.02;


    // Маркер камеры на миникарте

    updateCameraMarker();


    renderer.render(
        scene,
        camera
    );
}


animate();