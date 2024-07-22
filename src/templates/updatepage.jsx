import Content from "../components/content"
import Header from "../components/header"
import Menu from "../components/menu"
import { SettingItems } from "../components/menuitems"
const UpdateProfile = ({alg}) => {
    return (
        <>
            <Header text={"Настройки аккаунта"}></Header>
            <Menu items={SettingItems}></Menu>
            <Content>
                {alg}
            </Content>
        </>
    )
}

export default UpdateProfile