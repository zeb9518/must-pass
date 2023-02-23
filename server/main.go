package main

import "z-issue/initialize"

func main() {
	initialize.Mysql()

	initialize.Router()
}
