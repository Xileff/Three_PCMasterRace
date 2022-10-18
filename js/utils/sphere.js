import { DoubleSide, LineSegments, Mesh, MeshBasicMaterial, MeshLambertMaterial, SphereGeometry, WireframeGeometry } from "three"

const createSphere = (radius, widthSegments, heightSegments, color) => {
    return new Mesh(
        new SphereGeometry(radius, widthSegments, heightSegments),
        new MeshBasicMaterial({ 
            color: color,
            side: DoubleSide
         })
    )
}

const creatSphereWireframe = (radius, widthSegments, heightSegments, opacity = 0.4, depthTest = true, transparent = true) => {
    const sWireframe = new LineSegments( 
        new WireframeGeometry( 
            new SphereGeometry( radius, widthSegments, heightSegments )
        )
    )

    sWireframe.material.depthTest = depthTest
    sWireframe.material.opacity = opacity
    sWireframe.material.transparent = transparent

    return sWireframe
}

const rotateFreely = sphere => {
    sphere.rotation.z += 0.0015
}

const rotateFreelyReverse = sphere => {
    sphere.rotation.z -= 0.0015
}

export { createSphere, creatSphereWireframe, rotateFreely, rotateFreelyReverse }