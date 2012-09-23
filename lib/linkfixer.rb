require 'nokogiri'
require 'uri'
require 'open-uri'

class LinkFixer

	def self.link_magic(link, proxy)
		content = LinkFixer.link_content(link)
		fixed_doc = LinkFixer.fix_links(content, link, proxy)
		fixed_doc.to_html
	end

	def self.link_content(link)
		open(link) do |content|
    		content.read.to_s
  		end
	end

	def self.fix_links(html, url, proxy)
		html_doc = Nokogiri::HTML(html)
		#Process Links
		LinkFixer.all_links(html_doc).each do |link|
			fixed = LinkFixer.make_absolute(link.attributes["href"], url)
			link['href'] = (proxy + fixed) unless fixed.nil?
		end
		#Process Stylesheets
		LinkFixer.all_css(html_doc).each do |css|
			fixed = LinkFixer.make_absolute(css.attributes["href"], url)
			css['href'] = (proxy + fixed) unless fixed.nil?
		end
		#Process JavaScript
		LinkFixer.all_js(html_doc).each do |js|
			fixed = LinkFixer.make_absolute(js.attributes["href"], url)
			js['href'] = (proxy + fixed) unless fixed.nil?
		end
		#Process Images
		LinkFixer.all_images(html_doc).each do |image|
			fixed = LinkFixer.make_absolute(image.attributes["src"], url)
			image['src'] = (proxy + fixed) unless fixed.nil?
		end

		return html_doc
	end

	def self.all_links(doc)
		doc.css("a")
	end

	def self.all_css(doc)
		doc.search("[@type='text/css']")
	end

	def self.all_js(doc)
		doc.search("[@type='text/javascript']")
	end

	def self.all_images(doc)
		doc.css("img")
	end

	#from iron-io/iron_worker_examples/ruby_ng/web_crawler_nokogiri
	def self.make_absolute(href, root)
		URI.parse(root).merge(URI.parse(href)).to_s rescue nil
	end

end