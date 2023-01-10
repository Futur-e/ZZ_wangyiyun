import {request} from "@/utils/request";
//获取要播放歌曲的内容
export const getSong = (id)=>request('song/url',{id})
//获取搜索的歌曲内容
export const getSearchSong = (ids)=>request('song/detail',{ids})
//获取所有歌曲
export const getSongList=(keywords,offset)=>request('cloudsearch',{keywords,offset})
//获取相关专辑
export const getMultimatch=(keywords)=>request('search/multimatch',{keywords})
//获取歌手cloudsearch?keywords=阴天快乐&offset=0&type=100
export const getSongers = (keywords,offset,type)=>request('cloudsearch',{keywords,offset,type})

