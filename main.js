/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
/* harmony import */ var three_examples_jsm_loaders_MTLLoader_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/loaders/MTLLoader.js */ "./node_modules/three/examples/jsm/loaders/MTLLoader.js");
/* harmony import */ var three_examples_jsm_loaders_OBJLoader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/loaders/OBJLoader.js */ "./node_modules/three/examples/jsm/loaders/OBJLoader.js");
/* harmony import */ var _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tweenjs/tween.js */ "./node_modules/@tweenjs/tween.js/dist/tween.esm.js");





class ThreeJSContainer {
    scene;
    light;
    ambientLight;
    particleSystems = [];
    particleInfos = [];
    geometries = [];
    particleCount = 250;
    constructor() { }
    // 画面部分の作成(表示する枠ごとに)
    createRendererDOM = (width, height, cameraPos) => {
        const renderer = new three__WEBPACK_IMPORTED_MODULE_4__.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_4__.Color(0x000000));
        renderer.shadowMap.enabled = true; // シャドウマップを有効にする
        // カメラの設定
        const camera = new three__WEBPACK_IMPORTED_MODULE_4__.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.copy(cameraPos);
        camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, 0, 0));
        const orbitControls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__.OrbitControls(camera, renderer.domElement);
        this.createScene();
        // 毎フレームのupdateを呼んで，render
        // requestAnimationFrame により次フレームを呼ぶ
        const render = (time) => {
            // カメラの回転
            const rotationSpeed = 0.001; // カメラの回転速度
            const radius = 10; // カメラの回転半径
            const cameraX = radius * Math.cos(time * rotationSpeed);
            const cameraZ = radius * Math.sin(time * rotationSpeed);
            camera.position.set(cameraX, camera.position.y, cameraZ);
            camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, 0, 0));
            orbitControls.update();
            _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_3__["default"].update();
            renderer.render(this.scene, camera);
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
        renderer.domElement.style.cssFloat = "left";
        renderer.domElement.style.margin = "10px";
        return renderer.domElement;
    };
    // シーンの作成(全体で1回)
    createScene = () => {
        this.scene = new three__WEBPACK_IMPORTED_MODULE_4__.Scene();
        // 床の作成
        const floorGeometry = new three__WEBPACK_IMPORTED_MODULE_4__.CircleGeometry(3, 32); // 半径5の円
        const floorMaterial = new three__WEBPACK_IMPORTED_MODULE_4__.MeshPhongMaterial({ color: 0x00ff00 }); // 緑色
        const floor = new three__WEBPACK_IMPORTED_MODULE_4__.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2; // 床を水平にする
        floor.receiveShadow = true; // シャドウを受けるようにする
        this.scene.add(floor);
        // OBJファイルの読み込み
        let loadOBJ = (objFilePath, mtlFilePath) => {
            let object = new three__WEBPACK_IMPORTED_MODULE_4__.Object3D;
            const mtlLoader = new three_examples_jsm_loaders_MTLLoader_js__WEBPACK_IMPORTED_MODULE_1__.MTLLoader();
            mtlLoader.load(mtlFilePath, (material) => {
                material.preload();
                const objLoader = new three_examples_jsm_loaders_OBJLoader_js__WEBPACK_IMPORTED_MODULE_2__.OBJLoader();
                objLoader.setMaterials(material);
                objLoader.load(objFilePath, (obj) => {
                    object.add(obj);
                });
            });
            return object;
        };
        const mesh = loadOBJ("Kadai_Pichu.obj", "Kadai_Pichu.mtl");
        this.scene.add(mesh);
        // ライトの設定
        this.light = new three__WEBPACK_IMPORTED_MODULE_4__.DirectionalLight(0xffffff, 0.4);
        this.light.position.set(1, 1, 1).clone().normalize();
        this.light.castShadow = true; // シャドウを投影するようにする
        this.scene.add(this.light);
        this.ambientLight = new three__WEBPACK_IMPORTED_MODULE_4__.AmbientLight(0x404040, 0.5); // 環境光
        this.scene.add(this.ambientLight);
        // 花火を打ち上げる
        this.launchFirework();
    };
    launchFirework = () => {
        const initialPosition = this.generateRandomLaunchPosition();
        const geometry = new three__WEBPACK_IMPORTED_MODULE_4__.BufferGeometry();
        const positions = new Float32Array(this.particleCount * 3);
        geometry.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_4__.BufferAttribute(positions, 3));
        const colors = new Float32Array(this.particleCount * 4);
        geometry.setAttribute('color', new three__WEBPACK_IMPORTED_MODULE_4__.BufferAttribute(colors, 4));
        const particleSystem = createPoints(geometry);
        this.scene.add(particleSystem);
        this.particleSystems.push(particleSystem);
        this.geometries.push(geometry);
        const tweenInfos = [];
        for (let i = 0; i < this.particleCount; i++) {
            const tweenInfo = { x: initialPosition.x, y: initialPosition.y, z: initialPosition.z, opacity: 1, index: i };
            tweenInfos.push(tweenInfo);
        }
        this.particleInfos.push(tweenInfos);
        const launchTween = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_3__["default"].Tween({ y: initialPosition.y })
            .to({ y: initialPosition.y + 5 }, 2000) // 打ち上げ高さと時間
            .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_3__["default"].Easing.Quadratic.Out)
            .onUpdate(({ y }) => {
            tweenInfos.forEach(info => {
                info.y = y;
                this.updateParticlePosition(particleSystem, tweenInfos);
            });
        })
            .onComplete(() => this.startExplosion(particleSystem, tweenInfos));
        launchTween.start();
        // 次の花火をランダムな時間で打ち上げる
        setTimeout(this.launchFirework, Math.random() * 1000); // 0秒から1秒の間で次の花火を打ち上げる
    };
    startExplosion = (particleSystem, tweenInfos) => {
        const explosionLight = new three__WEBPACK_IMPORTED_MODULE_4__.PointLight(0xffffff, 1, 10); // 花火の爆発光
        explosionLight.position.set(tweenInfos[0].x, tweenInfos[0].y, tweenInfos[0].z);
        this.scene.add(explosionLight);
        tweenInfos.forEach((info, index) => {
            const explosionTween = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_3__["default"].Tween(info)
                .to({ ...this.generateRandomSpherePosition(info), opacity: 0 }, 7500) // opacityを0にする
                .easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_3__["default"].Easing.Exponential.Out)
                .onUpdate(() => {
                this.updateParticlePosition(particleSystem, tweenInfos);
                explosionLight.position.set(info.x, info.y, info.z);
                explosionLight.intensity = info.opacity; // 光の強度をフェードアウトに合わせる
            })
                .onComplete(() => {
                this.hideParticle(info);
                if (index === tweenInfos.length - 1) {
                    this.removeParticleSystem(particleSystem);
                    this.scene.remove(explosionLight);
                }
            });
            explosionTween.start();
        });
    };
    generateRandomLaunchPosition() {
        const x = (Math.random() - 0.5) * 25;
        const y = 0;
        const z = (Math.random() - 0.5) * 25;
        return { x, y, z };
    }
    generateRandomSpherePosition(info) {
        const radius = 2 + Math.random() * 3;
        const phi = Math.random() * Math.PI * 2;
        const theta = Math.acos((Math.random() * 2) - 1);
        const x = radius * Math.sin(theta) * Math.cos(phi) + info.x;
        const y = radius * Math.sin(theta) * Math.sin(phi) + info.y;
        const z = radius * Math.cos(theta) + info.z;
        return { x, y, z };
    }
    hideParticle = (tweenInfo) => {
        tweenInfo.x = tweenInfo.y = tweenInfo.z = 0;
        tweenInfo.opacity = 0;
    };
    removeParticleSystem = (particleSystem) => {
        this.scene.remove(particleSystem);
        const index = this.particleSystems.indexOf(particleSystem);
        if (index > -1) {
            this.particleSystems.splice(index, 1);
            this.geometries.splice(index, 1);
            this.particleInfos.splice(index, 1);
        }
    };
    updateParticlePosition = (particleSystem, tweenInfos) => {
        const positions = particleSystem.geometry.getAttribute('position');
        const colors = particleSystem.geometry.getAttribute('color');
        tweenInfos.forEach((info) => {
            positions.setXYZ(info.index, info.x, info.y, info.z);
            colors.setXYZW(info.index, 1, 1, 1, info.opacity); // 色のアルファ値を更新
        });
        positions.needsUpdate = true;
        colors.needsUpdate = true;
    };
}
window.addEventListener("DOMContentLoaded", init);
function init() {
    let container = new ThreeJSContainer();
    let viewport = container.createRendererDOM(640, 480, new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, 2, 10));
    document.body.appendChild(viewport);
}
let createPoints = (geom) => {
    const randomColor = [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
    var color = '0x' + randomColor[0].toString(16) + randomColor[1].toString(16) + randomColor[2].toString(16);
    let material = new three__WEBPACK_IMPORTED_MODULE_4__.PointsMaterial({
        size: 0.3,
        color: parseInt(color, 16),
        map: generateSprite(randomColor),
        transparent: true,
        vertexColors: true,
        blending: three__WEBPACK_IMPORTED_MODULE_4__.AdditiveBlending,
        depthWrite: false
    });
    return new three__WEBPACK_IMPORTED_MODULE_4__.Points(geom, material);
};
let generateSprite = (color) => {
    // 新しいキャンバスの作成
    let canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    // 円形のグラデーションの作成
    let context = canvas.getContext('2d');
    let gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
    // ランダムカラーを生成
    const color1 = `rgba(255,255,255,1)`;
    const color2 = `rgba(${color[0]},${color[1]},${color[2]},1)`;
    const color3 = `rgba(${color[0] / 4},${color[1] / 4},${color[2] / 4},1)`;
    const color4 = `rgba(0,0,0,1)`;
    gradient.addColorStop(0, color1);
    gradient.addColorStop(0.2, color2);
    gradient.addColorStop(0.4, color3);
    gradient.addColorStop(1, color4);
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    // テクスチャの生成
    let texture = new three__WEBPACK_IMPORTED_MODULE_4__.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcgprendering"] = self["webpackChunkcgprendering"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_tweenjs_tween_js_dist_tween_esm_js-node_modules_three_examples_jsm_contr-caa618"], () => (__webpack_require__("./src/app.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YUFBYTtXQUM3RDs7Ozs7V0NOQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvLi9zcmMvYXBwLnRzIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgT3JiaXRDb250cm9scyB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9jb250cm9scy9PcmJpdENvbnRyb2xzJztcbmltcG9ydCB7IE1UTExvYWRlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL01UTExvYWRlci5qcyc7XG5pbXBvcnQgeyBPQkpMb2FkZXIgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vbG9hZGVycy9PQkpMb2FkZXIuanMnO1xuaW1wb3J0IFRXRUVOIGZyb20gJ0B0d2VlbmpzL3R3ZWVuLmpzJztcblxuLy8g5Z6L5a6a576pXG5pbnRlcmZhY2UgVHdlZW5JbmZvIHtcbiAgICB4OiBudW1iZXI7XG4gICAgeTogbnVtYmVyO1xuICAgIHo6IG51bWJlcjtcbiAgICBvcGFjaXR5OiBudW1iZXI7XG4gICAgaW5kZXg6IG51bWJlcjtcbn1cblxuY2xhc3MgVGhyZWVKU0NvbnRhaW5lciB7XG4gICAgcHJpdmF0ZSBzY2VuZTogVEhSRUUuU2NlbmU7XG4gICAgcHJpdmF0ZSBsaWdodDogVEhSRUUuRGlyZWN0aW9uYWxMaWdodDtcbiAgICBwcml2YXRlIGFtYmllbnRMaWdodDogVEhSRUUuQW1iaWVudExpZ2h0O1xuICAgIHByaXZhdGUgcGFydGljbGVTeXN0ZW1zOiBUSFJFRS5Qb2ludHNbXSA9IFtdO1xuICAgIHByaXZhdGUgcGFydGljbGVJbmZvczogVHdlZW5JbmZvW11bXSA9IFtdO1xuICAgIHByaXZhdGUgZ2VvbWV0cmllczogVEhSRUUuQnVmZmVyR2VvbWV0cnlbXSA9IFtdO1xuICAgIHByaXZhdGUgcGFydGljbGVDb3VudCA9IDI1MDtcblxuICAgIGNvbnN0cnVjdG9yKCkge31cblxuICAgIC8vIOeUu+mdoumDqOWIhuOBruS9nOaIkCjooajnpLrjgZnjgovmnqDjgZTjgajjgaspXG4gICAgcHVibGljIGNyZWF0ZVJlbmRlcmVyRE9NID0gKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBjYW1lcmFQb3M6IFRIUkVFLlZlY3RvcjMpID0+IHtcbiAgICAgICAgY29uc3QgcmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcigpO1xuICAgICAgICByZW5kZXJlci5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICByZW5kZXJlci5zZXRDbGVhckNvbG9yKG5ldyBUSFJFRS5Db2xvcigweDAwMDAwMCkpO1xuICAgICAgICByZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCA9IHRydWU7IC8vIOOCt+ODo+ODieOCpuODnuODg+ODl+OCkuacieWKueOBq+OBmeOCi1xuXG4gICAgICAgIC8vIOOCq+ODoeODqeOBruioreWumlxuICAgICAgICBjb25zdCBjYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNzUsIHdpZHRoIC8gaGVpZ2h0LCAwLjEsIDEwMDApO1xuICAgICAgICBjYW1lcmEucG9zaXRpb24uY29weShjYW1lcmFQb3MpO1xuICAgICAgICBjYW1lcmEubG9va0F0KG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDApKTtcblxuICAgICAgICBjb25zdCBvcmJpdENvbnRyb2xzID0gbmV3IE9yYml0Q29udHJvbHMoY2FtZXJhLCByZW5kZXJlci5kb21FbGVtZW50KTtcblxuICAgICAgICB0aGlzLmNyZWF0ZVNjZW5lKCk7XG4gICAgICAgIC8vIOavjuODleODrOODvOODoOOBrnVwZGF0ZeOCkuWRvOOCk+OBp++8jHJlbmRlclxuICAgICAgICAvLyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUg44Gr44KI44KK5qyh44OV44Os44O844Og44KS5ZG844G2XG4gICAgICAgIGNvbnN0IHJlbmRlcjogRnJhbWVSZXF1ZXN0Q2FsbGJhY2sgPSAodGltZSkgPT4ge1xuICAgICAgICAgICAgLy8g44Kr44Oh44Op44Gu5Zue6LuiXG4gICAgICAgICAgICBjb25zdCByb3RhdGlvblNwZWVkID0gMC4wMDE7IC8vIOOCq+ODoeODqeOBruWbnui7oumAn+W6plxuICAgICAgICAgICAgY29uc3QgcmFkaXVzID0gMTA7IC8vIOOCq+ODoeODqeOBruWbnui7ouWNiuW+hFxuICAgICAgICAgICAgY29uc3QgY2FtZXJhWCA9IHJhZGl1cyAqIE1hdGguY29zKHRpbWUgKiByb3RhdGlvblNwZWVkKTtcbiAgICAgICAgICAgIGNvbnN0IGNhbWVyYVogPSByYWRpdXMgKiBNYXRoLnNpbih0aW1lICogcm90YXRpb25TcGVlZCk7XG4gICAgICAgICAgICBjYW1lcmEucG9zaXRpb24uc2V0KGNhbWVyYVgsIGNhbWVyYS5wb3NpdGlvbi55LCBjYW1lcmFaKTtcbiAgICAgICAgICAgIGNhbWVyYS5sb29rQXQobmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMCkpO1xuXG4gICAgICAgICAgICBvcmJpdENvbnRyb2xzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgVFdFRU4udXBkYXRlKCk7XG4gICAgICAgICAgICByZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgY2FtZXJhKTtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuICAgICAgICB9O1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcblxuICAgICAgICByZW5kZXJlci5kb21FbGVtZW50LnN0eWxlLmNzc0Zsb2F0ID0gXCJsZWZ0XCI7XG4gICAgICAgIHJlbmRlcmVyLmRvbUVsZW1lbnQuc3R5bGUubWFyZ2luID0gXCIxMHB4XCI7XG4gICAgICAgIHJldHVybiByZW5kZXJlci5kb21FbGVtZW50O1xuICAgIH1cblxuICAgIC8vIOOCt+ODvOODs+OBruS9nOaIkCjlhajkvZPjgacx5ZueKVxuICAgIHByaXZhdGUgY3JlYXRlU2NlbmUgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcblxuICAgICAgICAvLyDluorjga7kvZzmiJBcbiAgICAgICAgY29uc3QgZmxvb3JHZW9tZXRyeSA9IG5ldyBUSFJFRS5DaXJjbGVHZW9tZXRyeSgzLCAzMik7IC8vIOWNiuW+hDXjga7lhoZcbiAgICAgICAgY29uc3QgZmxvb3JNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCh7IGNvbG9yOiAweDAwZmYwMCB9KTsgLy8g57eR6ImyXG4gICAgICAgIGNvbnN0IGZsb29yID0gbmV3IFRIUkVFLk1lc2goZmxvb3JHZW9tZXRyeSwgZmxvb3JNYXRlcmlhbCk7XG4gICAgICAgIGZsb29yLnJvdGF0aW9uLnggPSAtTWF0aC5QSSAvIDI7IC8vIOW6iuOCkuawtOW5s+OBq+OBmeOCi1xuICAgICAgICBmbG9vci5yZWNlaXZlU2hhZG93ID0gdHJ1ZTsgLy8g44K344Oj44OJ44Km44KS5Y+X44GR44KL44KI44GG44Gr44GZ44KLXG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKGZsb29yKTtcblxuICAgICAgICAvLyBPQkrjg5XjgqHjgqTjg6vjga7oqq3jgb/ovrzjgb9cbiAgICAgICAgbGV0IGxvYWRPQkogPSAob2JqRmlsZVBhdGg6IHN0cmluZywgbXRsRmlsZVBhdGg6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgbGV0IG9iamVjdCA9IG5ldyBUSFJFRS5PYmplY3QzRDtcbiAgICAgICAgICAgIGNvbnN0IG10bExvYWRlciA9IG5ldyBNVExMb2FkZXIoKTtcbiAgICAgICAgICAgIG10bExvYWRlci5sb2FkKG10bEZpbGVQYXRoLCAobWF0ZXJpYWwpID0+IHtcbiAgICAgICAgICAgICAgICBtYXRlcmlhbC5wcmVsb2FkKCk7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2JqTG9hZGVyID0gbmV3IE9CSkxvYWRlcigpO1xuICAgICAgICAgICAgICAgIG9iakxvYWRlci5zZXRNYXRlcmlhbHMobWF0ZXJpYWwpO1xuICAgICAgICAgICAgICAgIG9iakxvYWRlci5sb2FkKG9iakZpbGVQYXRoLCAob2JqKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC5hZGQob2JqKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBtZXNoID0gbG9hZE9CSihcIkthZGFpX1BpY2h1Lm9ialwiLCBcIkthZGFpX1BpY2h1Lm10bFwiKTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQobWVzaCk7XG5cbiAgICAgICAgLy8g44Op44Kk44OI44Gu6Kit5a6aXG4gICAgICAgIHRoaXMubGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGZmZmZmZiwgMC40KTtcbiAgICAgICAgdGhpcy5saWdodC5wb3NpdGlvbi5zZXQoMSwgMSwgMSkubm9ybWFsaXplKCk7XG4gICAgICAgIHRoaXMubGlnaHQuY2FzdFNoYWRvdyA9IHRydWU7IC8vIOOCt+ODo+ODieOCpuOCkuaKleW9seOBmeOCi+OCiOOBhuOBq+OBmeOCi1xuICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmxpZ2h0KTtcblxuICAgICAgICB0aGlzLmFtYmllbnRMaWdodCA9IG5ldyBUSFJFRS5BbWJpZW50TGlnaHQoMHg0MDQwNDAsIDAuNSk7IC8vIOeSsOWig+WFiVxuICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmFtYmllbnRMaWdodCk7XG5cbiAgICAgICAgLy8g6Iqx54Gr44KS5omT44Gh5LiK44GS44KLXG4gICAgICAgIHRoaXMubGF1bmNoRmlyZXdvcmsoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxhdW5jaEZpcmV3b3JrID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBpbml0aWFsUG9zaXRpb24gPSB0aGlzLmdlbmVyYXRlUmFuZG9tTGF1bmNoUG9zaXRpb24oKTtcbiAgICAgICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKTtcbiAgICAgICAgY29uc3QgcG9zaXRpb25zID0gbmV3IEZsb2F0MzJBcnJheSh0aGlzLnBhcnRpY2xlQ291bnQgKiAzKTtcbiAgICAgICAgZ2VvbWV0cnkuc2V0QXR0cmlidXRlKCdwb3NpdGlvbicsIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUocG9zaXRpb25zLCAzKSk7XG5cbiAgICAgICAgY29uc3QgY29sb3JzID0gbmV3IEZsb2F0MzJBcnJheSh0aGlzLnBhcnRpY2xlQ291bnQgKiA0KTtcbiAgICAgICAgZ2VvbWV0cnkuc2V0QXR0cmlidXRlKCdjb2xvcicsIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUoY29sb3JzLCA0KSk7XG5cbiAgICAgICAgY29uc3QgcGFydGljbGVTeXN0ZW0gPSBjcmVhdGVQb2ludHMoZ2VvbWV0cnkpO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZChwYXJ0aWNsZVN5c3RlbSk7XG4gICAgICAgIHRoaXMucGFydGljbGVTeXN0ZW1zLnB1c2gocGFydGljbGVTeXN0ZW0pO1xuICAgICAgICB0aGlzLmdlb21ldHJpZXMucHVzaChnZW9tZXRyeSk7XG5cbiAgICAgICAgY29uc3QgdHdlZW5JbmZvczogVHdlZW5JbmZvW10gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBhcnRpY2xlQ291bnQ7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgdHdlZW5JbmZvOiBUd2VlbkluZm8gPSB7IHg6IGluaXRpYWxQb3NpdGlvbi54LCB5OiBpbml0aWFsUG9zaXRpb24ueSwgejogaW5pdGlhbFBvc2l0aW9uLnosIG9wYWNpdHk6IDEsIGluZGV4OiBpIH07XG4gICAgICAgICAgICB0d2VlbkluZm9zLnB1c2godHdlZW5JbmZvKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBhcnRpY2xlSW5mb3MucHVzaCh0d2VlbkluZm9zKTtcblxuICAgICAgICBjb25zdCBsYXVuY2hUd2VlbiA9IG5ldyBUV0VFTi5Ud2Vlbih7IHk6IGluaXRpYWxQb3NpdGlvbi55IH0pXG4gICAgICAgICAgICAudG8oeyB5OiBpbml0aWFsUG9zaXRpb24ueSArIDUgfSwgMjAwMCkgLy8g5omT44Gh5LiK44GS6auY44GV44Go5pmC6ZaTXG4gICAgICAgICAgICAuZWFzaW5nKFRXRUVOLkVhc2luZy5RdWFkcmF0aWMuT3V0KVxuICAgICAgICAgICAgLm9uVXBkYXRlKCh7IHkgfSkgPT4ge1xuICAgICAgICAgICAgICAgIHR3ZWVuSW5mb3MuZm9yRWFjaChpbmZvID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaW5mby55ID0geTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQYXJ0aWNsZVBvc2l0aW9uKHBhcnRpY2xlU3lzdGVtLCB0d2VlbkluZm9zKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub25Db21wbGV0ZSgoKSA9PiB0aGlzLnN0YXJ0RXhwbG9zaW9uKHBhcnRpY2xlU3lzdGVtLCB0d2VlbkluZm9zKSk7XG5cbiAgICAgICAgbGF1bmNoVHdlZW4uc3RhcnQoKTtcblxuICAgICAgICAvLyDmrKHjga7oirHngavjgpLjg6njg7Pjg4Djg6DjgarmmYLplpPjgafmiZPjgaHkuIrjgZLjgotcbiAgICAgICAgc2V0VGltZW91dCh0aGlzLmxhdW5jaEZpcmV3b3JrLCBNYXRoLnJhbmRvbSgpICogMTAwMCk7IC8vIDDnp5LjgYvjgokx56eS44Gu6ZaT44Gn5qyh44Gu6Iqx54Gr44KS5omT44Gh5LiK44GS44KLXG4gICAgfTtcblxuICAgIHByaXZhdGUgc3RhcnRFeHBsb3Npb24gPSAocGFydGljbGVTeXN0ZW06IFRIUkVFLlBvaW50cywgdHdlZW5JbmZvczogVHdlZW5JbmZvW10pID0+IHtcbiAgICAgICAgY29uc3QgZXhwbG9zaW9uTGlnaHQgPSBuZXcgVEhSRUUuUG9pbnRMaWdodCgweGZmZmZmZiwgMSwgMTApOyAvLyDoirHngavjga7niIbnmbrlhYlcbiAgICAgICAgZXhwbG9zaW9uTGlnaHQucG9zaXRpb24uc2V0KHR3ZWVuSW5mb3NbMF0ueCwgdHdlZW5JbmZvc1swXS55LCB0d2VlbkluZm9zWzBdLnopO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZChleHBsb3Npb25MaWdodCk7XG5cbiAgICAgICAgdHdlZW5JbmZvcy5mb3JFYWNoKChpbmZvLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZXhwbG9zaW9uVHdlZW4gPSBuZXcgVFdFRU4uVHdlZW4oaW5mbylcbiAgICAgICAgICAgICAgICAudG8oeyAuLi50aGlzLmdlbmVyYXRlUmFuZG9tU3BoZXJlUG9zaXRpb24oaW5mbyksIG9wYWNpdHk6IDAgfSwgNzUwMCkgLy8gb3BhY2l0eeOCkjDjgavjgZnjgotcbiAgICAgICAgICAgICAgICAuZWFzaW5nKFRXRUVOLkVhc2luZy5FeHBvbmVudGlhbC5PdXQpXG4gICAgICAgICAgICAgICAgLm9uVXBkYXRlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQYXJ0aWNsZVBvc2l0aW9uKHBhcnRpY2xlU3lzdGVtLCB0d2VlbkluZm9zKTtcbiAgICAgICAgICAgICAgICAgICAgZXhwbG9zaW9uTGlnaHQucG9zaXRpb24uc2V0KGluZm8ueCwgaW5mby55LCBpbmZvLnopO1xuICAgICAgICAgICAgICAgICAgICBleHBsb3Npb25MaWdodC5pbnRlbnNpdHkgPSBpbmZvLm9wYWNpdHk7IC8vIOWFieOBruW8t+W6puOCkuODleOCp+ODvOODieOCouOCpuODiOOBq+WQiOOCj+OBm+OCi1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLm9uQ29tcGxldGUoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVQYXJ0aWNsZShpbmZvKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSB0d2VlbkluZm9zLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlUGFydGljbGVTeXN0ZW0ocGFydGljbGVTeXN0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2VuZS5yZW1vdmUoZXhwbG9zaW9uTGlnaHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBleHBsb3Npb25Ud2Vlbi5zdGFydCgpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZVJhbmRvbUxhdW5jaFBvc2l0aW9uKCk6IHsgeDogbnVtYmVyOyB5OiBudW1iZXI7IHo6IG51bWJlciB9IHtcbiAgICAgICAgY29uc3QgeCA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDI1O1xuICAgICAgICBjb25zdCB5ID0gMDtcbiAgICAgICAgY29uc3QgeiA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDI1O1xuICAgICAgICByZXR1cm4geyB4LCB5LCB6IH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZVJhbmRvbVNwaGVyZVBvc2l0aW9uKGluZm86IFR3ZWVuSW5mbyk6IHsgeDogbnVtYmVyOyB5OiBudW1iZXI7IHo6IG51bWJlciB9IHtcbiAgICAgICAgY29uc3QgcmFkaXVzID0gMiArIE1hdGgucmFuZG9tKCkgKiAzO1xuICAgICAgICBjb25zdCBwaGkgPSBNYXRoLnJhbmRvbSgpICogTWF0aC5QSSAqIDI7XG4gICAgICAgIGNvbnN0IHRoZXRhID0gTWF0aC5hY29zKChNYXRoLnJhbmRvbSgpICogMikgLSAxKTtcblxuICAgICAgICBjb25zdCB4ID0gcmFkaXVzICogTWF0aC5zaW4odGhldGEpICogTWF0aC5jb3MocGhpKSArIGluZm8ueDtcbiAgICAgICAgY29uc3QgeSA9IHJhZGl1cyAqIE1hdGguc2luKHRoZXRhKSAqIE1hdGguc2luKHBoaSkgKyBpbmZvLnk7XG4gICAgICAgIGNvbnN0IHogPSByYWRpdXMgKiBNYXRoLmNvcyh0aGV0YSkgKyBpbmZvLno7XG5cbiAgICAgICAgcmV0dXJuIHsgeCwgeSwgeiB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgaGlkZVBhcnRpY2xlID0gKHR3ZWVuSW5mbzogVHdlZW5JbmZvKSA9PiB7XG4gICAgICAgIHR3ZWVuSW5mby54ID0gdHdlZW5JbmZvLnkgPSB0d2VlbkluZm8ueiA9IDA7XG4gICAgICAgIHR3ZWVuSW5mby5vcGFjaXR5ID0gMDtcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSByZW1vdmVQYXJ0aWNsZVN5c3RlbSA9IChwYXJ0aWNsZVN5c3RlbTogVEhSRUUuUG9pbnRzKSA9PiB7XG4gICAgICAgIHRoaXMuc2NlbmUucmVtb3ZlKHBhcnRpY2xlU3lzdGVtKTtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnBhcnRpY2xlU3lzdGVtcy5pbmRleE9mKHBhcnRpY2xlU3lzdGVtKTtcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVTeXN0ZW1zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB0aGlzLmdlb21ldHJpZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIHRoaXMucGFydGljbGVJbmZvcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHByaXZhdGUgdXBkYXRlUGFydGljbGVQb3NpdGlvbiA9IChwYXJ0aWNsZVN5c3RlbTogVEhSRUUuUG9pbnRzLCB0d2VlbkluZm9zOiBUd2VlbkluZm9bXSkgPT4ge1xuICAgICAgICBjb25zdCBwb3NpdGlvbnMgPSBwYXJ0aWNsZVN5c3RlbS5nZW9tZXRyeS5nZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJyk7XG4gICAgICAgIGNvbnN0IGNvbG9ycyA9IHBhcnRpY2xlU3lzdGVtLmdlb21ldHJ5LmdldEF0dHJpYnV0ZSgnY29sb3InKTtcbiAgICAgICAgdHdlZW5JbmZvcy5mb3JFYWNoKChpbmZvKSA9PiB7XG4gICAgICAgICAgICBwb3NpdGlvbnMuc2V0WFlaKGluZm8uaW5kZXgsIGluZm8ueCwgaW5mby55LCBpbmZvLnopO1xuICAgICAgICAgICAgY29sb3JzLnNldFhZWlcoaW5mby5pbmRleCwgMSwgMSwgMSwgaW5mby5vcGFjaXR5KTsgLy8g6Imy44Gu44Ki44Or44OV44Kh5YCk44KS5pu05pawXG4gICAgICAgIH0pO1xuICAgICAgICBwb3NpdGlvbnMubmVlZHNVcGRhdGUgPSB0cnVlO1xuICAgICAgICBjb2xvcnMubmVlZHNVcGRhdGUgPSB0cnVlO1xuICAgIH07XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBpbml0KTtcblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBsZXQgY29udGFpbmVyID0gbmV3IFRocmVlSlNDb250YWluZXIoKTtcblxuICAgIGxldCB2aWV3cG9ydCA9IGNvbnRhaW5lci5jcmVhdGVSZW5kZXJlckRPTSg2NDAsIDQ4MCwgbmV3IFRIUkVFLlZlY3RvcjMoMCwgMiwgMTApKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHZpZXdwb3J0KTtcbn1cblxubGV0IGNyZWF0ZVBvaW50cyA9IChnZW9tOiBUSFJFRS5CdWZmZXJHZW9tZXRyeSkgPT4ge1xuICAgIGNvbnN0IHJhbmRvbUNvbG9yID0gW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NiksIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NiksIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NildO1xuICAgIHZhciBjb2xvciA9ICcweCcgKyByYW5kb21Db2xvclswXS50b1N0cmluZygxNikgKyByYW5kb21Db2xvclsxXS50b1N0cmluZygxNikgKyByYW5kb21Db2xvclsyXS50b1N0cmluZygxNik7XG4gICAgbGV0IG1hdGVyaWFsID0gbmV3IFRIUkVFLlBvaW50c01hdGVyaWFsKHtcbiAgICAgICAgc2l6ZTogMC4zLFxuICAgICAgICBjb2xvcjogcGFyc2VJbnQoY29sb3IsIDE2KSxcbiAgICAgICAgbWFwOiBnZW5lcmF0ZVNwcml0ZShyYW5kb21Db2xvciksXG4gICAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgICB2ZXJ0ZXhDb2xvcnM6IHRydWUsIC8vIOmggueCueiJsuOCkuacieWKueOBq+OBmeOCi1xuICAgICAgICBibGVuZGluZzogVEhSRUUuQWRkaXRpdmVCbGVuZGluZyxcbiAgICAgICAgZGVwdGhXcml0ZTogZmFsc2VcbiAgICB9KTtcbiAgICByZXR1cm4gbmV3IFRIUkVFLlBvaW50cyhnZW9tLCBtYXRlcmlhbCk7XG59XG5cbmxldCBnZW5lcmF0ZVNwcml0ZSA9IChjb2xvcjogbnVtYmVyW10pID0+IHtcbiAgICAvLyDmlrDjgZfjgYTjgq3jg6Pjg7Pjg5Djgrnjga7kvZzmiJBcbiAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgY2FudmFzLndpZHRoID0gMTY7XG4gICAgY2FudmFzLmhlaWdodCA9IDE2O1xuXG4gICAgLy8g5YaG5b2i44Gu44Kw44Op44OH44O844K344On44Oz44Gu5L2c5oiQXG4gICAgbGV0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBsZXQgZ3JhZGllbnQgPSBjb250ZXh0LmNyZWF0ZVJhZGlhbEdyYWRpZW50KGNhbnZhcy53aWR0aCAvIDIsIGNhbnZhcy5oZWlnaHQgLyAyLCAwLCBjYW52YXMud2lkdGggLyAyLCBjYW52YXMuaGVpZ2h0IC8gMiwgY2FudmFzLndpZHRoIC8gMik7XG5cbiAgICAvLyDjg6njg7Pjg4Djg6Djgqvjg6njg7zjgpLnlJ/miJBcbiAgICBjb25zdCBjb2xvcjEgPSBgcmdiYSgyNTUsMjU1LDI1NSwxKWA7XG4gICAgY29uc3QgY29sb3IyID0gYHJnYmEoJHtjb2xvclswXX0sJHtjb2xvclsxXX0sJHtjb2xvclsyXX0sMSlgO1xuICAgIGNvbnN0IGNvbG9yMyA9IGByZ2JhKCR7Y29sb3JbMF0gLyA0fSwke2NvbG9yWzFdIC8gNH0sJHtjb2xvclsyXSAvIDR9LDEpYDtcbiAgICBjb25zdCBjb2xvcjQgPSBgcmdiYSgwLDAsMCwxKWA7XG5cbiAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMCwgY29sb3IxKTtcbiAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMC4yLCBjb2xvcjIpO1xuICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLjQsIGNvbG9yMyk7XG4gICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDEsIGNvbG9yNCk7XG5cbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGdyYWRpZW50O1xuICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcblxuICAgIC8vIOODhuOCr+OCueODgeODo+OBrueUn+aIkFxuICAgIGxldCB0ZXh0dXJlID0gbmV3IFRIUkVFLlRleHR1cmUoY2FudmFzKTtcbiAgICB0ZXh0dXJlLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgICByZXR1cm4gdGV4dHVyZTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rY2dwcmVuZGVyaW5nXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2NncHJlbmRlcmluZ1wiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1widmVuZG9ycy1ub2RlX21vZHVsZXNfdHdlZW5qc190d2Vlbl9qc19kaXN0X3R3ZWVuX2VzbV9qcy1ub2RlX21vZHVsZXNfdGhyZWVfZXhhbXBsZXNfanNtX2NvbnRyLWNhYTYxOFwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9hcHAudHNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==