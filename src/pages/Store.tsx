import { Col,Row } from "react-bootstrap"
import storeItems from "../data/items.json"
import Storeitem from "../components/Storeitem"

export default function Store(){
    return <>
    <h1>
        Store
    </h1>
    <Row md={2} xs={1} lg={3} className="g-3"  >
        {storeItems.map((item)=>(
            <Col key = {item.id} > 
              <Storeitem {...item}/> {/*yeh ek ek krke bhej rha h */}
            </Col>
        ) )}
    </Row>

    </>
}