require 'rubygems'
require 'sinatra'
require 'open-uri'

get '/' do
	"Hello, world.. This is Sinatra!"
end

get '/:id' do
	@id = params[:id]
	@link = "http://news.ycombinator.com/item?id=" + @id
	erb :main
end

get '/test/test' do
	open("http://www.google.com").read
end