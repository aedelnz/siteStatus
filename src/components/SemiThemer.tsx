import { useEffect, useState } from "react"
import { Button, Toast } from "@douyinfe/semi-ui"
import { IconMoon, IconSun } from "@douyinfe/semi-icons"
// 主题切换localStorage键值
const STORAGE_KEY = 'semi-theme-mode'

const SemiTheme = () => {
    // 初始化主题模式
    const getInitialTheme = () => {
        const savedTheme = localStorage.getItem(STORAGE_KEY)
        return savedTheme === 'dark' ? 'dark' : 'light'
    }

    // 主题切换
    const [themeMode, setThemeMode] = useState(getInitialTheme())
    const body = document.body

    // 同步主题到DOM
    useEffect(() => {
        if (themeMode === 'dark') {
            body.setAttribute('theme-mode', 'dark')
        } else {
            body.removeAttribute('theme-mode')
        }
    }, [body, themeMode])
    // 切换浅色模式
    const setLightMode = () => {
        body.removeAttribute('theme-mode')
        localStorage.setItem(STORAGE_KEY, 'light')
        setThemeMode('light')
        Toast.success({ content: '浅色模式已启用', duration: 1, stack: true })
    }
    // 切换深色模式
    const setDarkMode = () => {
        body.setAttribute('theme-mode', 'dark')
        localStorage.setItem(STORAGE_KEY, 'dark')
        setThemeMode('dark')
        Toast.success({ content: '深色模式已启用', duration: 1, stack: true })
    }

    return (
        <>
            <Button type="tertiary" icon={themeMode === 'light' ? <IconSun /> : <IconMoon />} onClick={themeMode === 'light' ? setDarkMode : setLightMode} />
        </>

    )
}

export default SemiTheme