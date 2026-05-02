import { Button, Nav } from '@douyinfe/semi-ui'
import { IconApartment, IconGithubLogo } from '@douyinfe/semi-icons'
import { IconAccessibility } from '@douyinfe/semi-icons-lab'
import { Config } from '../../Data'

const NavSub = () => {

    return (
        <div style={{ width: '100%' }}>
            <Nav
                items={[
                    ...Config.Navi.map((tool) => ({
                        itemKey: tool.url,
                        text: tool.name,
                        icon: tool.name === 'GitHub' ? <IconGithubLogo /> : <IconAccessibility />,
                    }))
                ]}
                onClick={(data) => { window.location.href = `/${data.itemKey}` }}
                header={<Button onClick={() => window.location.href = 'https://jixiejidiguan.top/'} theme='borderless' type='tertiary' icon={<IconApartment />} block>个人主页</Button>}
            />
        </div>
    )
}

export default NavSub
