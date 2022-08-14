import Vue from 'vue'

//  import  **  from   './***'
import PageTools from './pagetools'
import QuestionsInfo from './questionsinfo'
import ThemePicker from './ThemePicker'
import TagsView from './TagsView'
import lang from './lang'
import ScreenFull from './ScreenFull'
//Vue.component('**',**)
Vue.component('ScreenFull', ScreenFull) // 注册全屏组件
Vue.component('lang', lang)
Vue.component('TagsView', TagsView)
Vue.component('PageTools', PageTools)
Vue.component('QuestionsInfo', QuestionsInfo)
Vue.component('ThemePicker', ThemePicker)

