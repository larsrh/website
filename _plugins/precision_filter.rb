# Peer Allan on Stack Overflow
# https://stackoverflow.com/a/60243022
# CC-BY-SA

module Jekyll
  module PrecisionFilter
    def precision(input, value=0)
      ("%.#{value}f" % input)
    end
  end
end

Liquid::Template.register_filter(Jekyll::PrecisionFilter)
