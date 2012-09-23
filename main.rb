require 'rubygems'
require 'sinatra'
require 'open-uri'
require './lib/linkfixer'

get '/' do
	"Hello, world.. This is Sinatra!"
end

get '/:id' do
	@id = params[:id]
	@url = params[:url]
	@link = "http://news.ycombinator.com/item?id=" + @id
	@commentslink = "/p/proxy?url=" + "http://hncomments.nathancahill.com/comments/" + @id + "/html/"
	@framelink = '/p/proxy?url=' + @url
	erb :main
end

get '/p/proxy' do
  url = params[:url]
  #open(url) do |content|
    #content.read.to_s.gsub(/(href|src)=("|')\//, '\1=\2' + url + '/')
  #end
  LinkFixer.link_magic(url, "")
end