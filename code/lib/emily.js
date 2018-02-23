/**
 * Created by smy on 2018/2/12.
 */
function Emily(svg, formats, args) {
    this.svg = svg
    this.formats = formats
    this.yStep = 10
    this.style = {}
    for (var i = 2; i < arguments.length; i++) {
        var arg = arguments[i]
        if (isInteger(arg)) {
            this.yStep = arg
            continue
        }
        if (arg instanceof Object) {
            this.style = arg
            continue
        }
    }

    this.load = function (dataList) {
        for (var i in  dataList) {
            var data = dataList[i]
            var dataArray = data2array(data, this.formats)
            var id = data["id"]
            var g = this.svg.select("#" + id)
            var text = g.select("text")
            var x = text.attr("x")
            var yStep = this.yStep
            var y = Number(text.attr("y")) + yStep
            var dynamic = g.selectAll("text[dynamic]")
                .data(dataArray)
                .enter()
                .append("text")
                .attr("x", x)
                .attr("dynamic", true)
                .attr("y", function (d, i) {
                    return y + i * yStep
                })
                .text(function (d) {
                    return d
                })
            for (var key in this.style) {
                dynamic.style(key, this.style[key](data))
            }
        }
    }

    this.update = function (dataList) {
        for (var i in dataList) {
            var data = dataList[i]
            var dataArray = data2array(data, this.formats)
            var id = data["id"]
            var g = this.svg.select("#" + id)
            var dynamic = g.selectAll("text[dynamic]").data(dataArray).text(function (d) {
                return d
            })
            if (this.fill) {
                dynamic.style("fill", this.fill(data))
            }
            for (var key in this.style) {
                dynamic.style(key, this.style[key](data))
            }
        }
    }
}


